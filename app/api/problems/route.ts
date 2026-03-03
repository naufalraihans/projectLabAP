import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import toml from 'toml';

export async function GET() {
    try {
        // Determine path to problems.toml relative to the project root
        // Updated for Vercel deployment: reading from local data directory
        const problemsPath = path.resolve(process.cwd(), 'data/problems.toml');

        if (!fs.existsSync(problemsPath)) {
            return NextResponse.json({ error: 'Problems file not found' }, { status: 404 });
        }

        const fileContent = fs.readFileSync(problemsPath, 'utf-8');
        const data = toml.parse(fileContent);
        const problems = data.problems || [];

        // Filter out testCases from the public API response to prevent cheating (optional but good practice)
        const sanitizedProblems = problems.map((p: any) => {
            const { testCases, ...rest } = p;
            return rest;
        });

        return NextResponse.json(sanitizedProblems);
    } catch (error) {
        console.error('Error reading problems:', error);
        return NextResponse.json({ error: 'Failed to load problems' }, { status: 500 });
    }
}
