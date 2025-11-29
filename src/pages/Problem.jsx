import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProblemById } from '../data/problems';
import CodeEditor from '../components/CodeEditor';
import useStore from '../store/useStore';
import { CheckSquare, XSquare, Play, ArrowLeft, Terminal } from 'lucide-react';
import confetti from 'canvas-confetti';

const Problem = () => {
    const { id } = useParams();
    const problem = getProblemById(id);
    const { markProblemSolved } = useStore();

    const [code, setCode] = useState('');
    const [testResults, setTestResults] = useState([]);
    const [allPassed, setAllPassed] = useState(false);

    useEffect(() => {
        if (problem) {
            setCode(problem.boilerplate);
            setTestResults([]);
            setAllPassed(false);
        }
    }, [problem]);

    if (!problem) {
        return <div className="p-20 text-center text-white font-mono">ERROR: PROBLEM_NOT_FOUND</div>;
    }

    const runTests = (userCode) => {
        const results = [];
        let passedCount = 0;

        problem.testCases.forEach((testCase, index) => {
            try {
                const wrappedCode = `
          ${userCode}
          const funcName = '${problem.boilerplate.match(/function\s+(\w+)/)[1]}';
          return eval(funcName)(...${JSON.stringify(testCase.input)});
        `;

                // eslint-disable-next-line no-new-func
                const run = new Function(wrappedCode);
                const result = run();

                const isCorrect = JSON.stringify(result) === JSON.stringify(testCase.expected);

                if (isCorrect) passedCount++;

                results.push({
                    input: JSON.stringify(testCase.input),
                    expected: JSON.stringify(testCase.expected),
                    actual: JSON.stringify(result),
                    passed: isCorrect
                });
            } catch (err) {
                results.push({
                    input: JSON.stringify(testCase.input),
                    expected: JSON.stringify(testCase.expected),
                    actual: err.toString(),
                    passed: false,
                    error: true
                });
            }
        });

        setTestResults(results);
        const isAllPassed = passedCount === problem.testCases.length;
        setAllPassed(isAllPassed);

        if (isAllPassed) {
            markProblemSolved(problem.id);
            confetti({
                particleCount: 150,
                spread: 100,
                origin: { y: 0.6 },
                colors: ['#ccff00', '#ffffff', '#000000']
            });
        }
    };

    return (
        <div className="flex flex-col h-screen pt-16 bg-brand-black">
            {/* Header */}
            <div className="border-b border-brand-border px-6 py-3 flex justify-between items-center bg-brand-zinc">
                <div className="flex items-center">
                    <Link to="/practice" className="mr-4 text-gray-400 hover:text-white transition-colors">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-lg font-bold text-white flex items-center uppercase tracking-tight">
                            {problem.title}
                            <span className={`ml-4 text-xs font-bold px-2 py-0.5 border ${problem.difficulty === 'Easy' ? 'text-green-400 border-green-400' :
                                    problem.difficulty === 'Intermediate' ? 'text-blue-400 border-blue-400' :
                                        problem.difficulty === 'Advanced' ? 'text-orange-400 border-orange-400' :
                                            'text-red-400 border-red-400'}`}>
                                {problem.difficulty}
                            </span>
                        </h1>
                    </div>
                </div>
                {allPassed && (
                    <div className="flex items-center text-brand-lime font-bold font-mono tracking-widest border border-brand-lime px-3 py-1 bg-brand-lime/10">
                        <CheckSquare size={18} className="mr-2" />
                        STATUS: SOLVED
                    </div>
                )}
            </div>

            <div className="flex-grow flex flex-col lg:flex-row overflow-hidden">
                {/* Left Panel: Description & Test Cases */}
                <div className="lg:w-1/3 flex flex-col border-r border-brand-border overflow-y-auto custom-scrollbar bg-brand-black">
                    <div className="p-6 border-b border-brand-border">
                        <h3 className="text-xs font-bold text-brand-lime uppercase tracking-widest mb-4">Problem Spec</h3>
                        <p className="text-gray-300 mb-6 font-mono text-sm leading-relaxed">{problem.description}</p>
                    </div>

                    <div className="p-6">
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Test Execution</h3>
                        {testResults.length === 0 ? (
                            <div className="p-8 text-center border border-dashed border-brand-border bg-brand-zinc/50">
                                <Terminal size={32} className="mx-auto text-gray-600 mb-2" />
                                <p className="text-gray-500 text-xs font-mono uppercase">Waiting for execution...</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {testResults.map((result, idx) => (
                                    <div key={idx} className={`p-3 border transition-all ${result.passed ? 'bg-green-900/10 border-green-500/30' : 'bg-red-900/10 border-red-500/30'}`}>
                                        <div className="flex items-center mb-2">
                                            {result.passed ? <CheckSquare size={14} className="text-green-500 mr-2" /> : <XSquare size={14} className="text-red-500 mr-2" />}
                                            <span className={`text-xs font-bold uppercase tracking-wider ${result.passed ? 'text-green-400' : 'text-red-400'}`}>
                                                Test Case {idx + 1}
                                            </span>
                                        </div>
                                        <div className="text-xs font-mono space-y-1 ml-6 text-gray-400">
                                            <div><span className="text-gray-600">IN:</span> {result.input}</div>
                                            <div><span className="text-gray-600">EXP:</span> {result.expected}</div>
                                            <div className={`${result.passed ? 'text-green-400' : 'text-red-400'}`}>
                                                <span className="text-gray-600">ACT:</span> {result.actual}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Panel: Code Editor */}
                <div className="lg:w-2/3 bg-[#1e1e1e] flex flex-col">
                    <div className="flex-grow">
                        <CodeEditor
                            initialCode={code}
                            onRun={(val) => runTests(val)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Problem;
