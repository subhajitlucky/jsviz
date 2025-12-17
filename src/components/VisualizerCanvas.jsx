import React, { useState, useEffect } from 'react';

const VisualizerCanvas = ({ topicId, code, isRunning }) => {
    const [visualization, setVisualization] = useState(null);

    useEffect(() => {
        try {
            if (topicId === 'variables' || topicId === 'variables-scope') {
                const regex = /(?:let|const|var)\s+([\w$]+)\s*=\s*([^;]+);?/g;
                let match;
                const variables = [];

                while ((match = regex.exec(code)) !== null) {
                    variables.push({ name: match[1], value: match[2] });
                }

                if (variables.length === 0) {
                    setVisualization({
                        type: 'empty',
                        message: 'NO_VARIABLES_DETECTED — add a let/const/var assignment to visualize.'
                    });
                } else {
                    setVisualization({
                        type: 'variables',
                        variables
                    });
                }
            } else if (topicId === 'arrays') {
                setVisualization({
                    type: 'arrays'
                });
            } else {
                setVisualization({
                    type: 'default'
                });
            }
        } catch (err) {
            console.error('Visualizer error:', err);
            setVisualization({
                type: 'error',
                message: 'Visualization error. Please rerun.'
            });
        }
    }, [code, topicId]);

    const renderContent = () => {
        if (!visualization) {
            return (
                <div className="flex items-center justify-center h-full">
                    <p className="text-gray-600 font-mono text-xs">READY_TO_EXECUTE</p>
                </div>
            );
        }

        switch (visualization.type) {
            case 'empty':
                return (
                    <div className="flex items-center justify-center h-full p-4">
                        <div className="text-gray-600 font-mono text-xs bg-white/60 p-4 rounded border border-dashed border-gray-400">
                            {visualization.message}
                        </div>
                    </div>
                );

            case 'variables':
                return (
                    <div className="relative w-full h-full" style={{ background: 'rgba(15, 23, 42, 0.03)' }}>
                        <div className="absolute top-3 left-4 text-xs font-mono text-gray-600 uppercase tracking-widest">
                            Detected Variables
                        </div>
                        {visualization.variables.map((v, i) => (
                            <div
                                key={i}
                                className="absolute border border-brand-lime bg-white shadow-md p-4 flex flex-col items-center justify-center w-36 h-36 rounded animate-fadeInUp"
                                style={{
                                    left: `${40 + (i * 160)}px`,
                                    top: '60px',
                                    animationDelay: `${i * 200}ms`
                                }}
                            >
                                <div className="text-brand-lime font-bold text-lg mb-2">{v.value}</div>
                                <div className="text-gray-700 text-xs font-mono uppercase tracking-wider">{v.name}</div>
                            </div>
                        ))}
                    </div>
                );

            case 'arrays':
                return (
                    <div className="relative w-full h-full">
                        <div className="absolute top-2 left-10 text-brand-blue font-mono text-xs uppercase tracking-widest">
                            Array_Index_Map
                        </div>
                        <div className="flex space-x-2 mt-20 ml-10">
                            {[1, 2, 3, 4, 5].map((num, i) => (
                                <div
                                    key={i}
                                    className="w-16 h-16 border border-brand-blue bg-brand-zinc flex items-center justify-center text-white font-bold text-xl rounded animate-scaleIn"
                                    style={{
                                        animationDelay: `${i * 100}ms`
                                    }}
                                >
                                    {num}
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'error':
                return (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                            <div className="w-16 h-16 border-2 border-dashed border-red-400 rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-red-500 font-mono text-xs">{visualization.message}</p>
                        </div>
                    </div>
                );

            case 'default':
            default:
                return (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                            <div className="w-16 h-16 border-2 border-dashed border-gray-600 rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-gray-500 font-mono text-xs">VISUALIZATION_PENDING...</p>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="w-full h-full relative overflow-hidden">
            <style>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                @keyframes scaleIn {
                    from {
                        transform: scale(0);
                    }
                    to {
                        transform: scale(1);
                    }
                }
                .animate-fadeInUp {
                    animation: fadeInUp 0.5s ease-out forwards;
                }
                .animate-scaleIn {
                    animation: scaleIn 0.3s ease-out forwards;
                }
            `}</style>
            {renderContent()}
        </div>
    );
};

export default VisualizerCanvas;
