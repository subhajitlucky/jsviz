import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTopicById } from '../data/topics';
import { getTopicContent } from '../data/topicContents';
import Sidebar from '../components/Sidebar';
import { topics } from '../data/topics';
import CodeEditor from '../components/CodeEditor';
import VisualizerCanvas from '../components/VisualizerCanvas';
import useStore from '../store/useStore';
import { CheckSquare, Code, Lightbulb, BookOpen, Cpu, Layers } from 'lucide-react';

const Topic = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const topic = getTopicById(id);
    const content = getTopicContent(id);
    const { markTopicCompleted, progress } = useStore();

    const [code, setCode] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        if (topic && content) {
            setCode(content.examples[0]?.code || '// No example code available');
        }
    }, [topic, content]);

    if (!topic) {
        return <div className="p-20 text-center font-mono" style={{ color: 'var(--text-main)' }}>ERROR: TOPIC_NOT_FOUND</div>;
    }

    const handleRun = (newCode) => {
        setCode(newCode);
        setIsRunning(true);
        setTimeout(() => setIsRunning(false), 100);
    };

    const handleComplete = () => {
        markTopicCompleted(topic.id);
    };

    const isCompleted = progress.completedTopics.includes(topic.id);

    // If no detailed content exists, show placeholder
    if (!content) {
        return (
            <div className="flex min-h-screen pt-16" style={{ backgroundColor: 'var(--bg-main)' }}>
                <Sidebar topics={topics} />
                <div className="flex-grow p-24 text-center">
                    <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--text-main)' }}>{topic.title}</h1>
                    <p className="font-mono" style={{ color: 'var(--text-muted)' }}>
                        Detailed content for this topic is coming soon.
                    </p>
                </div>
            </div>
        );
    }

    const tabs = [
        { id: 'overview', label: 'Overview', icon: BookOpen },
        { id: 'syntax', label: 'Syntax', icon: Code },
        { id: 'examples', label: 'Examples', icon: Lightbulb },
        { id: 'memory', label: 'Memory Model', icon: Cpu },
    ];

    return (
        <div className="flex min-h-screen pt-16" style={{ backgroundColor: 'var(--bg-main)' }}>
            <Sidebar topics={topics} />

            <div className="flex-grow flex flex-col overflow-hidden">
                {/* Header */}
                <div className="border-b px-6 py-4 flex justify-between items-center" style={{ borderColor: 'var(--border-main)', backgroundColor: 'var(--bg-surface)' }}>
                    <div>
                        <div className="flex items-center space-x-3 mb-1">
                            <span className="font-mono text-xs px-2 py-1 border" style={{ color: 'var(--accent-main)', borderColor: 'var(--accent-main)' }}>
                                {topic.id.toUpperCase()}
                            </span>
                            <h1 className="text-2xl font-bold tracking-tight uppercase" style={{ color: 'var(--text-main)' }}>
                                {topic.title}
                            </h1>
                            {isCompleted && <CheckSquare size={20} style={{ color: 'var(--accent-main)' }} />}
                        </div>
                        <p className="text-sm font-mono" style={{ color: 'var(--text-muted)' }}>{topic.description}</p>
                    </div>
                    <button
                        onClick={handleComplete}
                        className="neo-btn px-4 py-2 text-sm flex items-center gap-2"
                    >
                        <CheckSquare size={16} />
                        {isCompleted ? 'COMPLETED' : 'MARK_COMPLETE'}
                    </button>
                </div>

                {/* Tabs */}
                <div className="border-b flex space-x-1 px-6" style={{ borderColor: 'var(--border-main)', backgroundColor: 'var(--bg-surface)' }}>
                    {tabs.map(tab => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-4 py-3 font-mono text-sm uppercase tracking-wider flex items-center gap-2 border-b-2 transition-colors ${activeTab === tab.id
                                        ? 'border-[var(--accent-main)] text-[var(--accent-main)]'
                                        : 'border-transparent'
                                    }`}
                                style={{ color: activeTab === tab.id ? 'var(--accent-main)' : 'var(--text-muted)' }}
                            >
                                <Icon size={16} />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                {/* Content Area */}
                <div className="flex-grow flex overflow-hidden">
                    {/* Left: Content */}
                    <div className="flex-1 overflow-y-auto p-8" style={{ backgroundColor: 'var(--bg-main)' }}>
                        {activeTab === 'overview' && (
                            <div className="max-w-3xl">
                                <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text-main)' }}>
                                    <BookOpen size={24} />
                                    What is {topic.title}?
                                </h2>
                                <p className="font-mono text-sm leading-relaxed mb-8" style={{ color: 'var(--text-main)' }}>
                                    {content.definition}
                                </p>

                                <h3 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text-main)' }}>
                                    <Layers size={20} />
                                    Use Cases
                                </h3>
                                <ul className="space-y-2 mb-8">
                                    {content.useCases.map((useCase, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <span className="text-[var(--accent-main)] mt-1">▸</span>
                                            <span className="font-mono text-sm" style={{ color: 'var(--text-main)' }}
                                                dangerouslySetInnerHTML={{ __html: useCase.replace(/\*\*(.*?)\*\*/g, '<strong style="color: var(--accent-main)">$1</strong>') }}
                                            />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {activeTab === 'syntax' && (
                            <div className="max-w-3xl">
                                <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text-main)' }}>
                                    <Code size={24} />
                                    Syntax
                                </h2>
                                <pre className="neo-card p-6 font-mono text-sm overflow-x-auto mb-6" style={{ backgroundColor: 'var(--bg-surface)', color: 'var(--text-main)' }}>
                                    {content.syntax}
                                </pre>
                            </div>
                        )}

                        {activeTab === 'examples' && (
                            <div className="max-w-3xl space-y-6">
                                <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text-main)' }}>
                                    <Lightbulb size={24} />
                                    Examples
                                </h2>
                                {content.examples.map((example, idx) => (
                                    <div key={idx} className="neo-card p-6">
                                        <h3 className="text-sm font-bold mb-2 uppercase tracking-wider" style={{ color: 'var(--accent-main)' }}>
                                            Example {idx + 1}
                                        </h3>
                                        <pre className="p-4 rounded font-mono text-sm overflow-x-auto mb-3" style={{ backgroundColor: '#1e1e1e', color: '#d4d4d4' }}>
                                            {example.code}
                                        </pre>
                                        <p className="text-sm font-mono" style={{ color: 'var(--text-muted)' }}>
                                            💡 {example.explanation}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'memory' && (
                            <div className="max-w-3xl">
                                <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text-main)' }}>
                                    <Cpu size={24} />
                                    How It Works In Memory
                                </h2>
                                <div className="neo-card p-6">
                                    <pre className="font-mono text-sm whitespace-pre-wrap" style={{ color: 'var(--text-main)' }}>
                                        {content.memoryModel}
                                    </pre>
                                </div>

                                {/* Visualization */}
                                {content.visualizationType && (
                                    <div className="mt-8">
                                        <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--text-main)' }}>
                                            Visual Representation
                                        </h3>
                                        <div className="neo-card p-6 relative min-h-[300px]" style={{ backgroundColor: 'var(--bg-surface)' }}>
                                            <VisualizerCanvas topicId={topic.id} code={code} isRunning={isRunning} />
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Right: Interactive Code Editor */}
                    <div className="w-[500px] border-l flex flex-col" style={{ borderColor: 'var(--border-main)', backgroundColor: '#1e1e1e' }}>
                        <div className="px-4 py-2 border-b flex items-center justify-between" style={{ borderColor: 'var(--border-main)', backgroundColor: '#252526' }}>
                            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                                Interactive Editor
                            </span>
                            <div className="flex space-x-1">
                                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            </div>
                        </div>
                        <div className="flex-grow">
                            <CodeEditor initialCode={code} onRun={handleRun} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Topic;
