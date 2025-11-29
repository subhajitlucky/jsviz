import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTopicById } from '../data/topics';
import Sidebar from '../components/Sidebar';
import { topics } from '../data/topics';
import CodeEditor from '../components/CodeEditor';
import VisualizerCanvas from '../components/VisualizerCanvas';
import useStore from '../store/useStore';
import { CheckSquare, ArrowLeft, Play, Terminal } from 'lucide-react';

const Topic = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const topic = getTopicById(id);
    const { markTopicCompleted } = useStore();

    const [code, setCode] = useState('');
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        if (topic) {
            let initialCode = '// Write some code to visualize\n';
            if (topic.id === 'variables') {
                initialCode = 'let a = 10;\nconst b = "Hello";\nvar c = true;\n\nconsole.log(a, b, c);';
            } else if (topic.id === 'arrays') {
                initialCode = 'const arr = [1, 2, 3, 4, 5];\nconsole.log(arr);';
            }
            setCode(initialCode);
        }
    }, [topic]);

    if (!topic) {
        return <div className="p-20 text-center text-white font-mono">ERROR: TOPIC_NOT_FOUND</div>;
    }

    const handleRun = (newCode) => {
        setCode(newCode);
        setIsRunning(true);
        setTimeout(() => setIsRunning(false), 100);
    };

    const handleComplete = () => {
        markTopicCompleted(topic.id);
    };

    return (
        <div className="flex min-h-screen pt-16 bg-brand-black">
            <Sidebar topics={topics} />

            <div className="flex-grow flex flex-col h-[calc(100vh-4rem)] overflow-hidden">
                {/* Header */}
                <div className="border-b border-brand-border px-6 py-4 flex justify-between items-center bg-brand-zinc">
                    <div>
                        <div className="flex items-center space-x-3 mb-1">
                            <span className="font-mono text-xs text-brand-lime border border-brand-lime px-1">
                                ID: {topic.id.toUpperCase()}
                            </span>
                            <h1 className="text-xl font-bold text-white tracking-tight uppercase">
                                {topic.title}
                            </h1>
                        </div>
                        <p className="text-sm text-gray-400 font-mono">{topic.description}</p>
                    </div>
                    <button
                        onClick={handleComplete}
                        className="neo-btn px-4 py-2 text-sm flex items-center gap-2"
                    >
                        <CheckSquare size={16} />
                        MARK_COMPLETE
                    </button>
                </div>

                {/* Content Split */}
                <div className="flex-grow flex flex-col lg:flex-row overflow-hidden">
                    {/* Left Panel: Explanation & Visualization */}
                    <div className="lg:w-1/2 flex flex-col border-r border-brand-border overflow-y-auto custom-scrollbar bg-brand-black">
                        <div className="p-8 border-b border-brand-border">
                            <div className="prose prose-invert max-w-none font-mono text-sm">
                                <h3 className="text-brand-lime uppercase tracking-widest border-b border-brand-border pb-2 mb-4">Concept Data</h3>
                                <p className="text-gray-300 leading-relaxed">
                                    Here you will learn about <strong className="text-white">{topic.title}</strong>.
                                    This section explains the core concepts, syntax, and common pitfalls.
                                </p>
                                <div className="bg-brand-zinc border border-brand-lime p-4 mt-6">
                                    <p className="text-brand-lime m-0 font-bold uppercase text-xs mb-1">
                    // SYSTEM_TIP
                                    </p>
                                    <p className="text-gray-300 m-0">
                                        Modify the code in the editor to trigger real-time visualization updates.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex-grow p-0 relative bg-brand-zinc/50">
                            <div className="absolute top-0 left-0 w-full border-b border-brand-border bg-brand-zinc px-4 py-1 flex justify-between items-center">
                                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                                    VISUALIZATION_OUTPUT
                                </span>
                                <div className="flex space-x-1">
                                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                </div>
                            </div>
                            <div className="p-8 pt-12 h-full">
                                <VisualizerCanvas topicId={topic.id} code={code} isRunning={isRunning} />
                            </div>
                        </div>
                    </div>

                    {/* Right Panel: Code Editor */}
                    <div className="lg:w-1/2 bg-[#1e1e1e] flex flex-col">
                        <CodeEditor initialCode={code} onRun={handleRun} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Topic;
