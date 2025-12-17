import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

const VariableVisualizer = ({ variables }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        // Animation when variables change
        anime({
            targets: '.variable-box',
            translateY: [20, 0],
            opacity: [0, 1],
            scale: [0.9, 1],
            delay: anime.stagger(100),
            easing: 'easeOutElastic(1, .8)'
        });
    }, [variables]);

    return (
        <div ref={containerRef} className="h-full w-full p-8 flex flex-wrap gap-6 items-start content-start overflow-y-auto bg-[#0f172a]/5">
            <style>{`
                .variable-box {
                    background: white;
                    border: 2px solid #a3e635;
                    border-radius: 12px;
                    padding: 16px;
                    width: 160px;
                    box-shadow: 0 10px 15px -3px rgba(163, 230, 53, 0.1);
                    position: relative;
                    overflow: hidden;
                    transition: all 0.3s ease;
                }
                .variable-box:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 20px 25px -5px rgba(163, 230, 53, 0.2);
                }
                .variable-label {
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 10px;
                    color: #64748b;
                    text-transform: uppercase;
                    margin-bottom: 8px;
                    letter-spacing: 0.1em;
                }
                .variable-value {
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 16px;
                    font-weight: 700;
                    color: #1e293b;
                    word-break: break-all;
                }
                .pulse-dot {
                    position: absolute;
                    top: 8px;
                    right: 8px;
                    width: 6px;
                    height: 6px;
                    background: #a3e635;
                    border-radius: 50%;
                }
                .memory-address {
                    font-size: 8px;
                    color: #cbd5e1;
                    margin-top: 12px;
                    font-family: monospace;
                }
            `}</style>
            
            {variables.map((v, i) => (
                <div key={`${v.name}-${i}`} className="variable-box">
                    <div className="pulse-dot"></div>
                    <div className="variable-label">{v.name}</div>
                    <div className="variable-value">{v.value}</div>
                    <div className="memory-address">0x{((i + 1) * 1234).toString(16).toUpperCase()}</div>
                    <div className="absolute bottom-0 left-0 h-1 bg-brand-lime w-full animate-grow-x"></div>
                </div>
            ))}

            {variables.length === 0 && (
                <div className="w-full h-full flex items-center justify-center border-2 border-dashed border-gray-200 rounded-xl">
                    <p className="text-gray-400 font-mono text-sm uppercase animate-pulse">
                        Waiting for variable assignments...
                    </p>
                </div>
            )}
        </div>
    );
};

export default VariableVisualizer;

