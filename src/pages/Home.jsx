
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Terminal, Cpu, Layers } from 'lucide-react';

const Home = () => {

    return (
        <div className="min-h-screen pt-16">
            {/* Hero Section */}
            <div className="border-b border-brand-border bg-brand-black relative overflow-hidden">
                {/* Animated Background Grid (Decorative) */}
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-lime/20 via-transparent to-brand-blue/20 animate-pulse"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 py-24 sm:py-32 text-center">
                    <div className="inline-block border border-brand-lime px-4 py-1 mb-8 bg-brand-lime/10 backdrop-blur-sm">
                        <span className="font-mono text-sm text-brand-lime tracking-widest uppercase animate-pulse">
                            System v1.0 // Online
                        </span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tighter mb-8">
                        VISUALIZE. EXECUTE. <span className="text-brand-lime">MASTER.</span>
                    </h1>

                    <p className="max-w-2xl mx-auto text-xl text-gray-400 font-mono mb-12">
                        Deconstruct JavaScript concepts with engineering precision.
                        Interactive visualizations. Real-time execution. No fluff.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <Link
                            to="/learn"
                            className="neo-btn px-8 py-4 text-lg flex items-center justify-center gap-2"
                        >
                            Initialize Learning
                            <ArrowRight size={20} />
                        </Link>

                        <Link
                            to="/playground"
                            className="neo-btn-secondary px-8 py-4 text-lg flex items-center justify-center gap-2"
                        >
                            <Terminal size={20} />
                            Open Terminal
                        </Link>
                    </div>
                </div>
            </div>

            {/* Stats / Grid Section */}
            <div className="border-b border-brand-border bg-brand-zinc">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-brand-border">
                    <div className="p-12 text-center group hover:bg-brand-black transition-colors">
                        <div className="text-4xl font-bold text-white mb-2 font-mono group-hover:text-brand-lime transition-colors">50+</div>
                        <div className="text-sm text-gray-500 uppercase tracking-widest">Algorithms</div>
                    </div>
                    <div className="p-12 text-center group hover:bg-brand-black transition-colors">
                        <div className="text-4xl font-bold text-white mb-2 font-mono group-hover:text-brand-lime transition-colors">100%</div>
                        <div className="text-sm text-gray-500 uppercase tracking-widest">Client-Side</div>
                    </div>
                    <div className="p-12 text-center group hover:bg-brand-black transition-colors">
                        <div className="text-4xl font-bold text-white mb-2 font-mono group-hover:text-brand-lime transition-colors">0ms</div>
                        <div className="text-sm text-gray-500 uppercase tracking-widest">Latency</div>
                    </div>
                </div>
            </div>

            {/* Features Grid */}
            <div className="max-w-7xl mx-auto px-4 py-24">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <FeatureCard
                        icon={<Layers size={32} />}
                        title="Mental Models"
                        description="Visual representations of abstract concepts. Stack, Heap, and Queue visualized in real-time."
                    />
                    <FeatureCard
                        icon={<Cpu size={32} />}
                        title="Execution Engine"
                        description="Sandboxed runtime environment. Write code, execute, and inspect output instantly."
                    />
                    <FeatureCard
                        icon={<Code size={32} />}
                        title="Algorithmic Drill"
                        description="Structured problem sets from basic syntax to complex functional programming patterns."
                    />
                </div>
            </div>
        </div>
    );
};

const FeatureCard = ({ icon, title, description }) => (
    <div className="neo-card p-8 h-full">
        <div className="text-brand-lime mb-6">
            {icon}
        </div>
        <h3 className="text-xl font-bold mb-4 uppercase tracking-tight" style={{ color: 'var(--text-main)' }}>{title}</h3>
        <p className="font-mono text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            {description}
        </p>
    </div>
);

export default Home;
