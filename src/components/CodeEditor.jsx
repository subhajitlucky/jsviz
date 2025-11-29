import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Play, Trash2, Terminal, Code } from 'lucide-react';
import useStore from '../store/useStore';

const CodeEditor = ({ initialCode = '', onRun, readOnly = false }) => {
    const { theme } = useStore();
    const [code, setCode] = useState(initialCode);
    const [output, setOutput] = useState([]);
    const [isError, setIsError] = useState(false);

    const handleEditorChange = (value) => {
        setCode(value);
    };

    const executeCode = () => {
        setOutput([]);
        setIsError(false);

        const logs = [];
        const originalConsoleLog = console.log;
        const originalConsoleError = console.error;

        console.log = (...args) => {
            logs.push(args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg)).join(' '));
        };

        console.error = (...args) => {
            setIsError(true);
            logs.push(args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg)).join(' '));
        };

        try {
            // eslint-disable-next-line no-new-func
            const run = new Function(code);
            const result = run();

            if (result !== undefined) {
                logs.push(String(result));
            }
        } catch (error) {
            setIsError(true);
            logs.push(error.toString());
        } finally {
            console.log = originalConsoleLog;
            console.error = originalConsoleError;
            setOutput(logs);
            if (onRun) onRun(code, logs, isError);
        }
    };

    const clearConsole = () => {
        setOutput([]);
        setIsError(false);
    };

    return (
        <div className="flex flex-col h-full bg-[#1e1e1e] border-l border-brand-border">
            {/* Toolbar */}
            <div className="flex items-center justify-between px-4 py-2 bg-brand-zinc border-b border-brand-border">
                <div className="flex items-center space-x-2">
                    <Code size={14} className="text-brand-lime" />
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono">Editor_Pane</span>
                </div>
                <div className="flex space-x-2">
                    {!readOnly && (
                        <button
                            onClick={executeCode}
                            className="neo-btn px-3 py-1 text-xs flex items-center gap-2"
                        >
                            <Play size={12} fill="currentColor" />
                            EXECUTE
                        </button>
                    )}
                </div>
            </div>

            {/* Editor & Console Split */}
            <div className="flex-grow flex flex-col h-full">
                <div className="flex-grow h-2/3 relative">
                    <Editor
                        height="100%"
                        defaultLanguage="javascript"
                        value={code}
                        theme="vs-dark"
                        onChange={handleEditorChange}
                        options={{
                            minimap: { enabled: false },
                            fontSize: 14,
                            fontFamily: "'JetBrains Mono', monospace",
                            scrollBeyondLastLine: false,
                            readOnly: readOnly,
                            automaticLayout: true,
                            padding: { top: 16 },
                            renderLineHighlight: 'line',
                            cursorBlinking: 'solid',
                        }}
                    />
                </div>

                {/* Console Output */}
                <div className="h-1/3 bg-[#1e1e1e] flex flex-col border-t border-brand-border">
                    <div className="px-4 py-1 bg-brand-zinc border-b border-brand-border flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <Terminal size={12} className="text-gray-400" />
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono">Console_Output</span>
                        </div>
                        <button
                            onClick={clearConsole}
                            className="p-1 text-gray-500 hover:text-red-500 transition-colors"
                            title="Clear Console"
                        >
                            <Trash2 size={12} />
                        </button>
                    </div>
                    <div className="flex-grow p-4 overflow-y-auto font-mono text-sm bg-brand-black">
                        {output.length === 0 ? (
                            <span className="text-gray-600 italic text-xs font-mono">Waiting for output...</span>
                        ) : (
                            output.map((line, index) => (
                                <div key={index} className={`mb-1 font-mono text-xs ${isError ? 'text-red-400' : 'text-gray-300'}`}>
                                    <span className="text-brand-lime mr-2">➜</span>
                                    {line}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CodeEditor;
