import React, { useEffect } from 'react';
import anime from 'animejs';

const CallStackVisualizer = ({ frames }) => {
    useEffect(() => {
        anime({
            targets: '.stack-frame',
            translateY: [40, 0],
            opacity: [0, 1],
            scale: [0.8, 1],
            delay: anime.stagger(150),
            easing: 'easeOutElastic(1, .8)'
        });
    }, [frames]);

    return (
        <div className="h-full w-full flex flex-col items-center bg-[#0f172a]/5 p-8 overflow-hidden">
            <style>{`
                .stack-container {
                    width: 100%;
                    max-width: 320px;
                    display: flex;
                    flex-direction: column-reverse;
                    gap: 12px;
                    position: relative;
                }
                .stack-frame {
                    background: white;
                    border: 3px solid #3b82f6;
                    border-radius: 12px;
                    padding: 20px;
                    text-align: center;
                    box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.2);
                    position: relative;
                }
                .frame-title {
                    font-family: 'JetBrains Mono', monospace;
                    font-weight: 800;
                    font-size: 14px;
                    color: #1e3a8a;
                }
                .execution-cursor {
                    position: absolute;
                    left: -40px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: #3b82f6;
                    animation: bounceRight 1s infinite alternate;
                }
                @keyframes bounceRight {
                    from { transform: translate(-5px, -50%); }
                    to { transform: translate(5px, -50%); }
                }
                .stack-base {
                    width: 100%;
                    max-width: 400px;
                    height: 12px;
                    background: #cbd5e1;
                    border-radius: 6px;
                    margin-top: 20px;
                }
            `}</style>

            <div className="self-start mb-8">
                <h3 className="text-xs font-mono font-bold text-gray-500 uppercase tracking-widest">Global Call Stack</h3>
            </div>

            <div className="stack-container">
                {frames.map((frame, i) => (
                    <div key={i} className="stack-frame">
                        {i === frames.length - 1 && (
                            <div className="execution-cursor">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M5.59,7.41L7,6L13,12L7,18L5.59,16.59L10.17,12L5.59,7.41M11.59,7.41L13,6L19,12L13,18L11.59,16.59L16.17,12L11.59,7.41Z" />
                                </svg>
                            </div>
                        )}
                        <div className="frame-title">{frame}</div>
                        <div className="text-[9px] text-gray-400 mt-2 uppercase font-mono tracking-tighter">
                            Execution_Context_{frames.length - i}
                        </div>
                    </div>
                ))}
            </div>

            <div className="stack-base"></div>
            <div className="text-[10px] font-mono text-gray-400 mt-4 uppercase">
                Hardware Call Stack (LIFO)
            </div>
        </div>
    );
};

export default CallStackVisualizer;

