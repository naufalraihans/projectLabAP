
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import toml from 'toml';

// Helper: Sleep function for rate limiting (for C)
const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

async function runPiston(language: string, files: { name: string, content: string }[], stdin: string = "") {
    const pistonUrl = 'https://emkc.org/api/v2/piston/execute';

    // Config for C: GCC needs explicit build steps sometimes, but Piston handles single file compile-n-run well.
    // However, fast repeated requests trigger rate limits.

    // Map to Piston runtimes
    const runtime = language === 'c' ? 'c' : 'python';
    const version = language === 'c' ? '10.2.0' : '3.10.0'; // Piston basic versions

    const payload = {
        language: runtime,
        version: "*",
        files: files,
        stdin: stdin,
        compile_timeout: 10000,
        run_timeout: 3000,
    };

    try {
        const response = await fetch(pistonUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.status === 429) {
            throw new Error("Too Many Requests (Rate Limit). Please wait a moment.");
        }

        if (!response.ok) {
            throw new Error(`Piston API Error: ${response.statusText}`);
        }

        return await response.json();
    } catch (error: any) {
        return { error: error.message };
    }
}

// ----------------------------------------------------------------------
// PYTHON BATCH RUNNER
// Wraps user code so it runs ALL test cases in ONE single Piston execution
// ----------------------------------------------------------------------
function generatePythonBatchRunner(userCode: string, testCases: any[]) {
    // We inject a test runner that monkey-patches stdin/stdout
    const testCasesJson = JSON.stringify(testCases);

    return `
import sys
import json
import io

# User Code provided as string
user_code = ${JSON.stringify(userCode)}

# Test Cases
test_cases = ${testCasesJson}

results = {
    "status": "Accepted",
    "details": "All test cases passed!",
    "failed_case": None
}

def run_test(input_str):
    # Setup Mock IO
    original_stdin = sys.stdin
    original_stdout = sys.stdout
    
    sys.stdin = io.StringIO(input_str)
    sys.stdout = io.StringIO()
    
    try:
        # Create a new namespace for execution to avoid variable leaks between tests
        # But we need basic builtins
        global_scope = {"__builtins__": __builtins__}
        
        exec(user_code, global_scope)
        
        output = sys.stdout.getvalue()
        return {"output": output, "error": None}
    except Exception as e:
        return {"output": "", "error": str(e)}
    finally:
        sys.stdin = original_stdin
        sys.stdout = original_stdout

# Run all cases
for i, case in enumerate(test_cases):
    inp = case['input']
    exp = case['output'].strip()
    
    # Run
    res = run_test(inp)
    
    if res['error']:
        results["status"] = "Runtime Error"
        results["details"] = f"Error on Test Case {i+1}: {res['error']}"
        break
        
    got = res['output'].strip()
    # Normalize newlines
    got = "\\n".join(got.splitlines())
    exp = "\\n".join(exp.splitlines())
    
    if got != exp:
        results["status"] = "Wrong Answer"
        results["details"] = f"Test Case {i+1} Failed"
        results["failed_case"] = {
            "input": inp,
            "expected": exp,
            "got": got
        }
        break

print(json.dumps(results))
    `;
}

export async function POST(req: NextRequest) {
    try {
        const { code, problemId } = await req.json();
        const pid = problemId || 1;

        if (!code) return NextResponse.json({ error: 'No code provided' }, { status: 400 });

        // 1. Load Problem
        const problemsPath = path.resolve(process.cwd(), 'data/problems.toml');

        if (!fs.existsSync(problemsPath)) {
            // Fallback for some vercel envs if data not found
            return NextResponse.json({ status: "System Error", details: "Config not found" });
        }
        const fileContent = fs.readFileSync(problemsPath, 'utf-8');
        const problem = toml.parse(fileContent).problems?.find((p: any) => p.id === Number(pid));

        if (!problem) return NextResponse.json({ status: "System Error", details: "Problem not found" });

        const testCases = problem.testCases || [];
        const lang = problem.language || 'python';

        // ------------------------------------------------------------------
        // STRATEGY 1: PYTHON (BATCH EXECUTOR) - Fast, 1 Request
        // ------------------------------------------------------------------
        if (lang === 'python') {
            const batchScript = generatePythonBatchRunner(code, testCases);

            const result = await runPiston('python', [{ name: 'server_judge.py', content: batchScript }]);

            if (result.error) return NextResponse.json({ status: "System Error", details: result.error });
            if (result.run && result.run.code !== 0) {
                // If the wrapper script itself crashed
                return NextResponse.json({ status: "System Error", details: result.run.stderr });
            }

            try {
                // Parse the JSON output from our python wrapper
                const judgeResult = JSON.parse(result.run.stdout);
                return NextResponse.json(judgeResult);
            } catch (e) {
                return NextResponse.json({ status: "System Error", details: "Invalid judge output: " + result.run.stdout });
            }
        }

        // ------------------------------------------------------------------
        // STRATEGY 2: C Language (Iterative with Sleep) - Slower, Multiple Requests
        // ------------------------------------------------------------------
        // Batching C is hard (need to re-exec main). simpler to just loop with delay.

        for (let i = 0; i < testCases.length; i++) {
            const testCase = testCases[i];
            const inputData = testCase.input;
            const expectedOutput = testCase.output.trim();

            const result = await runPiston('c', [{ name: 'main.c', content: code }], inputData);

            if (result.error) {
                return NextResponse.json({ status: "System Error", details: result.error });
            }

            if (result.compile && result.compile.code !== 0) {
                return NextResponse.json({
                    status: "Compilation Error",
                    details: result.compile.stderr || result.compile.output
                });
            }

            if (result.run && result.run.code !== 0) {
                return NextResponse.json({
                    status: "Runtime Error",
                    details: result.run.stderr || `Error on Test Case ${i + 1}`
                });
            }

            const userOutput = (result.run.stdout || "").trim();
            // Normalize
            const normGot = userOutput.replace(/\r\n/g, "\n");
            const normExp = expectedOutput.replace(/\r\n/g, "\n");

            if (normGot !== normExp) {
                return NextResponse.json({
                    status: "Wrong Answer",
                    details: `Test Case ${i + 1} Failed`,
                    failed_case: {
                        input: inputData,
                        expected: normExp, // display expected
                        got: normGot
                    }
                });
            }

            // SAFETY DELAY: Wait 500ms before next request to respect rate limits
            // Only sleep if there are more cases
            if (i < testCases.length - 1) await sleep(500);
        }

        return NextResponse.json({ status: "Accepted", details: "All test cases passed!" });

    } catch (error: any) {
        console.error("Route Error:", error);
        return NextResponse.json({ status: "System Error", details: error.message }, { status: 500 });
    }
}
