import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTopicById } from '../data/topics';
import { getTopicContent } from '../data/topics/contents';
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
            <div className="min-h-screen pt-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--bg-main)' }}>
                <div className="max-w-4xl mx-auto p-8 sm:p-12 text-center">
                    <h1 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--text-main)' }}>{topic.title}</h1>
                    <p className="font-mono text-sm sm:text-base" style={{ color: 'var(--text-muted)' }}>
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
        <div className="min-h-screen pt-16 flex flex-col" style={{ backgroundColor: 'var(--bg-main)' }}>
            {/* Header */}
            <div className="border-b py-4" style={{ borderColor: 'var(--border-main)', backgroundColor: 'var(--bg-surface)' }}>
                <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex-1">
                        <div className="flex items-center space-x-2 sm:space-x-3 mb-2 flex-wrap gap-2">
                            <span className="font-mono text-xs px-2 py-1 border" style={{ color: 'var(--accent-main)', borderColor: 'var(--accent-main)' }}>
                                {topic.id.toUpperCase()}
                            </span>
                            <h1 className="text-xl sm:text-2xl font-bold tracking-tight uppercase" style={{ color: 'var(--text-main)' }}>
                                {topic.title}
                            </h1>
                            {isCompleted && <CheckSquare size={20} style={{ color: 'var(--accent-main)' }} />}
                        </div>
                        <p className="text-xs sm:text-sm font-mono" style={{ color: 'var(--text-muted)' }}>{topic.description}</p>
                    </div>
                    <button
                        onClick={handleComplete}
                        className="neo-btn px-3 sm:px-4 py-2 text-xs sm:text-sm flex items-center gap-2 whitespace-nowrap"
                    >
                        <CheckSquare size={16} />
                        {isCompleted ? 'COMPLETED' : 'MARK_COMPLETE'}
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b flex space-x-1 overflow-x-auto" style={{ borderColor: 'var(--border-main)', backgroundColor: 'var(--bg-surface)' }}>
                <div className="max-w-7xl mx-auto w-full flex space-x-1 px-4 sm:px-6 lg:px-8">
                    {tabs.map(tab => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-2 sm:px-4 py-3 font-mono text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${activeTab === tab.id
                                        ? 'border-[var(--accent-main)] text-[var(--accent-main)]'
                                        : 'border-transparent'
                                    }`}
                                style={{ color: activeTab === tab.id ? 'var(--accent-main)' : 'var(--text-muted)' }}
                            >
                                <Icon size={16} />
                                <span className="hidden sm:inline">{tab.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Content Area - Stack on mobile, side-by-side on larger screens */}
            <div className="flex-grow w-full" style={{ backgroundColor: 'var(--bg-main)' }}>
                <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-6 lg:gap-8 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
                {/* Left: Content */}
                <div className="flex-1 overflow-y-auto order-2 lg:order-1">
                    <div className="w-full space-y-8">
                        {activeTab === 'overview' && (
                            <div>
                            <h2 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text-main)' }}>
                                <BookOpen size={24} />
                                What is {topic.title}?
                            </h2>
                            <p className="font-mono text-xs sm:text-sm leading-relaxed mb-8" style={{ color: 'var(--text-main)' }}>
                                {content.definition}
                            </p>

                            <h3 className="text-base sm:text-lg font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text-main)' }}>
                                <Layers size={20} />
                                Use Cases
                            </h3>
                            <ul className="space-y-2 mb-8">
                                {content.useCases.map((useCase, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <span className="text-[var(--accent-main)] mt-1 flex-shrink-0">▸</span>
                                        <span className="font-mono text-xs sm:text-sm" style={{ color: 'var(--text-main)' }}
                                            dangerouslySetInnerHTML={{ __html: useCase.replace(/\*\*(.*?)\*\*/g, '<strong style="color: var(--accent-main)">$1</strong>') }}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>
                        )}

                        {activeTab === 'syntax' && (
                            <div>
                            <h2 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text-main)' }}>
                                <Code size={24} />
                                Syntax
                            </h2>
                            <pre className="neo-card p-4 sm:p-6 font-mono text-xs sm:text-sm overflow-x-auto mb-6" style={{ backgroundColor: 'var(--bg-surface)', color: 'var(--text-main)' }}>
                                {content.syntax}
                            </pre>
                        </div>
                        )}

                        {activeTab === 'examples' && (
                            <div className="space-y-6">
                            <h2 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text-main)' }}>
                                <Lightbulb size={24} />
                                Examples
                            </h2>
                            {content.examples.map((example, idx) => (
                                <div key={idx} className="neo-card p-4 sm:p-6">
                                    <h3 className="text-xs sm:text-sm font-bold mb-2 uppercase tracking-wider" style={{ color: 'var(--accent-main)' }}>
                                        Example {idx + 1}
                                    </h3>
                                    <pre className="p-3 sm:p-4 rounded font-mono text-xs sm:text-sm overflow-x-auto mb-3" style={{ backgroundColor: '#1e1e1e', color: '#d4d4d4' }}>
                                        {example.code}
                                    </pre>
                                    <p className="text-xs sm:text-sm font-mono" style={{ color: 'var(--text-muted)' }}>
                                        💡 {example.explanation}
                                    </p>
                                </div>
                            ))}
                        </div>
                        )}

                        {activeTab === 'memory' && (
                            <div>
                            <h2 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text-main)' }}>
                                <Cpu size={24} />
                                How It Works In Memory
                            </h2>
                            <div className="neo-card p-4 sm:p-6">
                                <pre className="font-mono text-xs sm:text-sm whitespace-pre-wrap" style={{ color: 'var(--text-main)' }}>
                                    {content.memoryModel}
                                </pre>
                            </div>

                            {/* Visualization */}
                            {content.visualizationType && (
                                <div className="mt-8">
                                    <h3 className="text-base sm:text-lg font-bold mb-4" style={{ color: 'var(--text-main)' }}>
                                        Visual Representation
                                    </h3>
                                    <div className="neo-card p-4 sm:p-6 relative min-h-[250px] sm:min-h-[300px]" style={{ backgroundColor: 'var(--bg-surface)' }}>
                                        <VisualizerCanvas topicId={topic.id} code={code} isRunning={isRunning} />
                                    </div>
                                </div>
                            )}
                        </div>
                        )}
                    </div>
                    </div>

                {/* Right: Interactive Code Editor */}
                <div className="w-full lg:w-[500px] border-t lg:border-t-0 lg:border-l flex flex-col order-1 lg:order-2" style={{ borderColor: 'var(--border-main)', backgroundColor: '#1e1e1e', maxHeight: '500px', minHeight: '300px' }}>
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
                    <div className="flex-grow overflow-hidden">
                        <CodeEditor initialCode={code} onRun={handleRun} />
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
};

export default Topic;
