import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Play, Trash2, Terminal, Code } from 'lucide-react';
import useStore from '../store/useStore';

const CodeEditor = ({ initialCode = '', onRun, readOnly = false }) => {
    const { theme } = useStore();
    const [code, setCode] = useState(initialCode);
    const outputRef = React.useRef(null);

    // Update internal state when prop changes
    React.useEffect(() => {
        setCode(initialCode);
    }, [initialCode]);

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
        let restored = false;

        const restoreConsole = () => {
            if (restored) return;
            console.log = originalConsoleLog;
            console.error = originalConsoleError;
            restored = true;
        };

        const pushLog = (isErr, args) => {
            if (isErr) setIsError(true);
            const line = args
                .map(arg => {
                    if (typeof arg === 'object') {
                        try {
                            return JSON.stringify(arg);
                        } catch {
                            return '[object]';
                        }
                    }
                    return String(arg);
                })
                .join(' ');
            logs.push(line);
            setOutput([...logs]);
        };

        console.log = (...args) => pushLog(false, args);
        console.error = (...args) => pushLog(true, args);

        const FLUSH_DELAY = 1500; // capture async logs briefly

        try {
            // eslint-disable-next-line no-new-func
            const run = new Function(code);
            const result = run();

            if (result !== undefined) {
                pushLog(false, [result]);
            }
        } catch (error) {
            pushLog(true, [error.toString()]);
        } finally {
            // allow async logs to arrive, then restore console
            setTimeout(() => {
                restoreConsole();
                if (onRun) onRun(code, logs, isError);
            }, FLUSH_DELAY);
        }
    };

    const clearConsole = () => {
        setOutput([]);
        setIsError(false);
    };

    // Auto-scroll console to bottom when output changes
    React.useEffect(() => {
        if (outputRef.current) {
            outputRef.current.scrollTop = outputRef.current.scrollHeight;
        }
    }, [output]);

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
            <div className="flex-grow flex flex-col h-full overflow-hidden">
                <div className="flex-1 overflow-hidden relative" style={{ minHeight: '200px' }}>
                    <Editor
                        height="100%"
                        defaultLanguage="javascript"
                        value={code}
                        theme="vs-dark"
                        onChange={handleEditorChange}
                        options={{
                            minimap: { enabled: false },
                            fontSize: 13,
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

                {/* Console Output - Fixed height section */}
                <div className="h-[40%] flex-shrink-0 bg-[#0f1115] flex flex-col border-t border-brand-border">
                    <div className="px-4 py-1.5 bg-[#151821] border-b border-brand-border flex justify-between items-center flex-shrink-0">
                        <div className="flex items-center space-x-2">
                            <Terminal size={12} className="text-gray-200" />
                            <span className="text-xs font-bold text-gray-100 uppercase tracking-widest font-mono">Console_Output</span>
                        </div>
                        <button
                            onClick={clearConsole}
                            className="p-1 text-gray-400 hover:text-red-400 transition-colors"
                            title="Clear Console"
                        >
                            <Trash2 size={12} />
                        </button>
                    </div>
                    <div ref={outputRef} className="flex-grow p-3 overflow-y-auto font-mono text-xs leading-relaxed bg-[#0c0d11]">
                        {output.length === 0 ? (
                            <span className="text-gray-500 italic text-xs font-mono">Waiting for output...</span>
                        ) : (
                            output.map((line, index) => (
                                <div key={index} className={`mb-1 font-mono text-xs ${isError ? 'text-red-300' : 'text-gray-100'}`}>
                                    <span className="text-brand-lime mr-2 font-bold">➜</span>
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
