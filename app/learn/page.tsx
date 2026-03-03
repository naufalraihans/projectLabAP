"use client";

import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Play, CheckCircle, AlertCircle, Terminal, List, Code as CodeIcon } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import 'katex/dist/katex.min.css';

interface Problem {
  id: number;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard" | "ASLAB";
  category?: string;
  tags: string[];
  description: string;
  defaultCode: string;
  language?: string;
}

export default function LearnPage() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [selectedProblemId, setSelectedProblemId] = useState(1);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [showProblemList, setShowProblemList] = useState(true);

  React.useEffect(() => {
    fetch('/api/problems')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setProblems(data);
          setCode(data[0].defaultCode);
          setSelectedProblemId(data[0].id);
        }
      })
      .catch(err => console.error("Failed to load problems:", err));
  }, []);

  const activeProblem = problems.find(p => p.id === selectedProblemId) || problems[0];

  const handleSelectProblem = (id: number) => {
    const problem = problems.find(p => p.id === id);
    if (problem) {
      setSelectedProblemId(id);
      setCode(problem.defaultCode);
      setOutput(null);
    }
  };

  const handleRun = async () => {
    setLoading(true);
    setOutput(null);
    try {
      const response = await fetch('/api/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, problemId: selectedProblemId })
      });
      const data = await response.json();
      setOutput(data);
    } catch (error) {
      setOutput({ status: "Error", details: "Failed to connect to server" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden bg-[#1e1e1e] text-gray-100 font-sans">
      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar Problem List */}
        <div className={`transition-all duration-300 border-r border-[#333] bg-[#252526] flex flex-col ${showProblemList ? 'w-64' : 'w-0'}`}>
          <div className="p-4 border-b border-[#333] flex items-center justify-between">
            <h2 className="font-bold text-gray-300 flex items-center gap-2">
              <List size={18} /> Problem List
            </h2>
          </div>
          <div className="flex-1 overflow-y-auto">
            {problems.map((problem: Problem) => (
              <button
                key={problem.id}
                onClick={() => handleSelectProblem(problem.id)}
                className={`w-full text-left p-4 border-b border-[#333] hover:bg-[#2a2d2e] transition-colors ${selectedProblemId === problem.id ? 'bg-[#37373d] border-l-4 border-l-lab-gold' : ''}`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="font-medium text-sm truncate pr-2">{problem.id}. {problem.title}</span>
                </div>
                <div className="flex gap-2">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${problem.difficulty === 'Easy' ? 'bg-green-900/30 text-green-400 border border-green-900' :
                    problem.difficulty === 'Medium' ? 'bg-yellow-900/30 text-yellow-400 border border-yellow-900' :
                      problem.difficulty === 'Hard' ? 'bg-red-900/30 text-red-400 border border-red-900' :
                        problem.difficulty === 'ASLAB' ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white border-none animate-pulse shadow-[0_0_10px_rgba(168,85,247,0.5)]' :
                          'bg-gray-800 text-gray-400'
                    }`}>
                    {problem.difficulty}
                  </span>
                  {problem.category && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-blue-900/30 text-blue-400 border border-blue-900">
                      {problem.category}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {!activeProblem ? (
            <div className="flex items-center justify-center w-full h-full text-gray-500">
              Loading problem details...
            </div>
          ) : (
            <>
              {/* Left Panel: Description */}
              <div className="w-1/2 flex flex-col border-r border-[#333]">
                <div className="h-10 border-b border-[#333] flex items-center px-4 bg-[#252526] justify-between">
                  <button onClick={() => setShowProblemList(!showProblemList)} className="text-gray-400 hover:text-white">
                    <List size={18} />
                  </button>
                  <span className="text-sm font-medium text-gray-300 truncate ml-2">
                    {activeProblem.id}. {activeProblem.title}
                  </span>
                  <div className="flex gap-2 items-center">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${activeProblem.difficulty === 'Easy' ? 'bg-green-900/30 text-green-400 border border-green-900' :
                      activeProblem.difficulty === 'Medium' ? 'bg-yellow-900/30 text-yellow-400 border border-yellow-900' :
                        activeProblem.difficulty === 'Hard' ? 'bg-red-900/30 text-red-400 border border-red-900' :
                          activeProblem.difficulty === 'ASLAB' ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white border-none animate-pulse shadow-[0_0_10px_rgba(168,85,247,0.5)]' :
                            'bg-gray-800 text-gray-400'
                      }`}>
                      {activeProblem.difficulty}
                    </span>
                    {activeProblem.category && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-blue-900/30 text-blue-400 border border-blue-900">
                        {activeProblem.category}
                      </span>
                    )}
                    {activeProblem.tags.map((tag: string) => (
                      <span key={tag} className="text-xs bg-[#3c3c3c] text-gray-400 px-2 py-0.5 rounded border border-[#333]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex-1 p-6 overflow-y-auto prose prose-invert max-w-none">
                  <ReactMarkdown
                    remarkPlugins={[remarkMath]}
                    rehypePlugins={[rehypeKatex, rehypeRaw]}
                  >
                    {activeProblem.description}
                  </ReactMarkdown>
                </div>
              </div>

              {/* Right Panel: Editor */}
              <div className="w-1/2 flex flex-col bg-[#1e1e1e]">
                <div className="h-10 border-b border-[#333] flex items-center px-4 justify-between bg-[#252526]">
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <CodeIcon size={12} /> {activeProblem.language === 'c' ? 'C' : 'Python 3.10'}
                  </span>
                  <button
                    onClick={handleRun}
                    disabled={loading}
                    className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-colors
                            ${loading ? 'bg-gray-600 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 text-white'}`}
                  >
                    {loading ? <span className="animate-spin">⟳</span> : <Play size={16} fill="currentColor" />}
                    Run Code
                  </button>
                </div>

                <div className="flex-1">
                  <Editor
                    height="100%"
                    language={activeProblem.language || 'python'}
                    theme="vs-dark"
                    value={code}
                    onChange={(value) => setCode(value || "")}
                    options={{ minimap: { enabled: false }, fontSize: 14, automaticLayout: true }}
                  />
                </div>

                {/* Console */}
                <div className={`border-t border-[#333] bg-[#252526] transition-all duration-300 ${output ? 'h-64' : 'h-10'}`}>
                  <div className="h-10 px-4 flex items-center border-b border-[#333] bg-[#1e1e1e] cursor-pointer" onClick={() => !output && setOutput({})}>
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <Terminal size={14} />
                      <span>Console</span>
                    </div>
                  </div>
                  {output && (
                    <div className="p-4 h-[calc(100%-40px)] overflow-y-auto font-mono text-sm">
                      {output.status === "Accepted" ? (
                        <div className="text-green-500 flex items-center gap-2 mb-2">
                          <CheckCircle size={18} /> <span className="font-bold text-lg">Accepted</span>
                        </div>
                      ) : output.status === "Error" ? (
                        <div className="text-red-500 flex items-center gap-2 mb-2">
                          <AlertCircle size={18} /> <span className="font-bold text-lg">Error</span>
                        </div>
                      ) : (
                        <div className="text-red-500 flex items-center gap-2 mb-2">
                          <AlertCircle size={18} /> <span className="font-bold text-lg">{output.status}</span>
                        </div>
                      )}
                      <div className="mt-4 bg-[#1e1e1e] p-3 rounded border border-[#333]">
                        <pre className="whitespace-pre-wrap text-gray-300">{output.details}</pre>
                        {output.failed_case && (
                          <div className="mt-4 pt-4 border-t border-[#333]">
                            <p className="text-red-400 mb-2 font-semibold">Failed Test Case:</p>
                            <div className="grid grid-cols-2 gap-4">
                              <div><p className="text-xs text-gray-500">Input</p><div className="bg-[#2d2d2d] p-2 rounded mt-1">{output.failed_case.input}</div></div>
                              <div><p className="text-xs text-gray-500">Expected</p><div className="bg-[#2d2d2d] p-2 rounded mt-1">{output.failed_case.expected}</div></div>
                              <div className="col-span-2"><p className="text-xs text-gray-500">Your Output</p><div className="bg-[#2d2d2d] p-2 rounded mt-1 border border-red-900/50">{output.failed_case.got}</div></div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
