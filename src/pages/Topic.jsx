import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { topics, getTopicById } from '../data/topics';
import { getTopicContent } from '../data/topics/contents';
import CodeEditor from '../components/CodeEditor';
import VisualizerCanvas from '../components/VisualizerCanvas';
import useStore from '../store/useStore';
import { CheckSquare, Code, Lightbulb, BookOpen, Cpu, Layers, Copy, Check, ArrowLeft, ArrowRight, List } from 'lucide-react';

const Topic = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const topic = getTopicById(id);
    const content = getTopicContent(id);
    const { markTopicCompleted, progress } = useStore();

    const [code, setCode] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');
    const [copiedIndex, setCopiedIndex] = useState(null);

    // Flatten all topics to find prev/next
    const allTopicsFlattened = useMemo(() => {
        return topics.flatMap(cat => cat.items);
    }, []);

    const currentIndex = useMemo(() => {
        return allTopicsFlattened.findIndex(t => t.id === id);
    }, [allTopicsFlattened, id]);

    const prevTopic = allTopicsFlattened[currentIndex - 1];
    const nextTopic = allTopicsFlattened[currentIndex + 1];

    useEffect(() => {
        if (topic && content) {
            setCode(content.examples[0]?.code || '// No example code available');
            setActiveTab('overview'); // Reset tab on topic change
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

    const handleCopy = (text, index) => {
        navigator.clipboard.writeText(text);
        setCode(text); // Auto-paste to editor
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
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
                            <Link to="/learn" className="p-1.5 rounded hover:bg-gray-800 text-gray-400 transition-colors mr-1" title="Back to Topics" aria-label="Back to Topics List">
                                <List size={18} />
                            </Link>
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
                    
                    <div className="flex items-center gap-3">
                        <div className="flex items-center bg-brand-zinc rounded p-1 border border-brand-border mr-2 shadow-inner">
                            <button
                                onClick={() => prevTopic && navigate(`/topic/${prevTopic.id}`)}
                                disabled={!prevTopic}
                                className={`p-1.5 rounded transition-all ${!prevTopic ? 'opacity-20 cursor-not-allowed' : 'hover:bg-gray-700 text-brand-lime hover:scale-110 active:scale-95'}`}
                                title={prevTopic ? `Previous: ${prevTopic.title}` : "No previous topic"}
                                aria-label={prevTopic ? `Go to previous topic: ${prevTopic.title}` : "No previous topic"}
                            >
                                <ArrowLeft size={18} />
                            </button>
                            <div className="w-px h-4 bg-brand-border mx-1"></div>
                            <button
                                onClick={() => nextTopic && navigate(`/topic/${nextTopic.id}`)}
                                disabled={!nextTopic}
                                className={`p-1.5 rounded transition-all ${!nextTopic ? 'opacity-20 cursor-not-allowed' : 'hover:bg-gray-700 text-brand-lime hover:scale-110 active:scale-95'}`}
                                title={nextTopic ? `Next: ${nextTopic.title}` : "No next topic"}
                                aria-label={nextTopic ? `Go to next topic: ${nextTopic.title}` : "No next topic"}
                            >
                                <ArrowRight size={18} />
                            </button>
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
                    <div className="flex-1 overflow-y-auto order-2 lg:order-1 min-w-0">
                        <div className="space-y-8">
                            {activeTab === 'overview' && (
                                <div className="w-full">
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
                            <div className="neo-card overflow-hidden" style={{ backgroundColor: '#1e1e1e' }}>
                                <SyntaxHighlighter
                                    language="javascript"
                                    style={vscDarkPlus}
                                    customStyle={{ margin: 0, padding: '1.5rem', background: '#1e1e1e', fontSize: '0.875rem' }}
                                    wrapLongLines={true}
                                >
                                    {content.syntax}
                                </SyntaxHighlighter>
                            </div>
                        </div>
                        )}

                        {activeTab === 'examples' && (
                            <div className="space-y-6">
                            <h2 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text-main)' }}>
                                <Lightbulb size={24} />
                                Examples
                            </h2>
                            {content.examples.map((example, idx) => (
                                <div key={idx} className="neo-card p-4 sm:p-6 relative group">
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider" style={{ color: 'var(--accent-main)' }}>
                                            Example {idx + 1}
                                        </h3>
                                        <button
                                            onClick={() => handleCopy(example.code, idx)}
                                            className="p-1.5 rounded bg-brand-zinc hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
                                            title="Copy to Editor"
                                        >
                                            {copiedIndex === idx ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                                        </button>
                                    </div>
                                    <div className="rounded overflow-hidden mb-3 border border-gray-700 relative">
                                        <SyntaxHighlighter
                                            language="javascript"
                                            style={vscDarkPlus}
                                            customStyle={{ margin: 0, padding: '1rem', background: '#1e1e1e', fontSize: '0.875rem' }}
                                            wrapLongLines={true}
                                        >
                                            {example.code}
                                        </SyntaxHighlighter>
                                    </div>
                                    <p className="text-xs sm:text-sm font-mono" style={{ color: 'var(--text-muted)' }}>
                                        💡 {example.explanation}
                                    </p>
                                </div>
                            ))}
                        </div>
                        )}

                        {activeTab === 'memory' && (
                            <div className="max-w-3xl">
                                <h2 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text-main)' }}>
                                    <Cpu size={24} />
                                    How It Works In Memory
                                </h2>
                                <div className="neo-card p-6 markdown-content">
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        components={{
                                            h3: ({ node, ...props }) => <h3 className="text-lg font-bold mt-4 mb-2 text-[var(--text-main)]" {...props} />,
                                            strong: ({ node, ...props }) => <strong className="text-[var(--accent-main)]" {...props} />,
                                            ul: ({ node, ...props }) => <ul className="list-disc pl-5 space-y-1 mb-4 text-[var(--text-main)]" {...props} />,
                                            ol: ({ node, ...props }) => <ol className="list-decimal pl-5 space-y-1 mb-4 text-[var(--text-main)]" {...props} />,
                                            li: ({ node, ...props }) => <li className="text-sm font-mono leading-relaxed pl-1" {...props} />,
                                            p: ({ node, ...props }) => <p className="text-sm font-mono leading-relaxed mb-4 text-[var(--text-main)]" {...props} />,
                                            code: ({ node, inline, className, children, ...props }) => {
                                                const match = /language-(\w+)/.exec(className || '');
                                                if (!inline && match) {
                                                    return (
                                                        <SyntaxHighlighter
                                                            style={vscDarkPlus}
                                                            language={match[1]}
                                                            PreTag="div"
                                                            customStyle={{
                                                                margin: '1rem 0',
                                                                padding: '1rem',
                                                                background: '#1e1e1e',
                                                                fontSize: '0.875rem',
                                                                borderRadius: '0.375rem',
                                                            }}
                                                            wrapLongLines
                                                            {...props}
                                                        >
                                                            {String(children).replace(/\n$/, '')}
                                                        </SyntaxHighlighter>
                                                    );
                                                }
                                                return (
                                                    <code
                                                        className="inline-block align-middle bg-[#f4f4f5] text-[#111] px-1.5 py-0.5 rounded text-xs font-bold border border-gray-300 mx-1"
                                                        {...props}
                                                    >
                                                        {children}
                                                    </code>
                                                );
                                            },
                                        }}
                                    >
                                        {content.memoryModel}
                                    </ReactMarkdown>
                                </div>

                                {/* Visualization */}
                                {content.visualizationType && (
                                    <div className="mt-8">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-base sm:text-lg font-bold" style={{ color: 'var(--text-main)' }}>
                                                Visual Representation
                                            </h3>
                                            <div className="flex items-center gap-2">
                                                <span className="w-2 h-2 rounded-full bg-brand-lime animate-pulse"></span>
                                                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Live_Engine_Sim</span>
                                            </div>
                                        </div>
                                        <div className="neo-card p-0 relative min-h-[400px] border-2 overflow-hidden" style={{ borderColor: 'var(--accent-main)', backgroundColor: 'var(--bg-surface)' }}>
                                            <VisualizerCanvas topicId={topic.id} code={code} isRunning={isRunning} />
                                        </div>
                                        <p className="mt-3 text-[10px] font-mono text-center" style={{ color: 'var(--text-muted)' }}>
                                            TIP: EDIT THE CODE ON THE RIGHT TO SEE THE VISUALIZATION UPDATE IN REAL-TIME.
                                        </p>
                                    </div>
                                )}
                                </div>
                            )}
                            
                            {/* Bottom Navigation */}
                            <div className="pt-12 border-t border-brand-border flex justify-between items-center gap-4">
                                {prevTopic ? (
                                    <button 
                                        onClick={() => navigate(`/topic/${prevTopic.id}`)}
                                        className="flex flex-col items-start group text-left max-w-[45%]"
                                    >
                                        <span className="text-[10px] font-mono text-gray-500 flex items-center gap-1 group-hover:text-[var(--accent-main)] transition-colors">
                                            <ArrowLeft size={10} /> PREVIOUS_TOPIC
                                        </span>
                                        <span className="text-sm font-bold truncate w-full" style={{ color: 'var(--text-main)' }}>
                                            {prevTopic.title}
                                        </span>
                                    </button>
                                ) : <div />}

                                {nextTopic ? (
                                    <button 
                                        onClick={() => navigate(`/topic/${nextTopic.id}`)}
                                        className="flex flex-col items-end group text-right max-w-[45%]"
                                    >
                                        <span className="text-[10px] font-mono text-gray-500 flex items-center gap-1 group-hover:text-[var(--accent-main)] transition-colors">
                                            NEXT_TOPIC <ArrowRight size={10} />
                                        </span>
                                        <span className="text-sm font-bold truncate w-full" style={{ color: 'var(--text-main)' }}>
                                            {nextTopic.title}
                                        </span>
                                    </button>
                                ) : <div />}
                            </div>
                        </div>
                    </div>

                    {/* Right: Interactive Code Editor */}
                    <div className="w-full lg:w-[500px] border-t lg:border-t-0 lg:border-l flex flex-col order-1 lg:order-2" style={{ borderColor: 'var(--border-main)', backgroundColor: '#1e1e1e', maxHeight: '600px', minHeight: '400px' }}>
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
