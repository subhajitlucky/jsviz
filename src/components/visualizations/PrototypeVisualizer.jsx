import React, { useEffect } from 'react';
import anime from 'animejs';

const PrototypeVisualizer = ({ chain }) => {
    useEffect(() => {
        anime({
            targets: '.chain-node',
            translateX: [-100, 0],
            opacity: [0, 1],
            delay: anime.stagger(200),
            easing: 'easeOutExpo'
        });

        anime({
            targets: '.chain-arrow',
            scaleY: [0, 1],
            opacity: [0, 1],
            delay: anime.stagger(200, { start: 100 }),
            easing: 'linear'
        });
    }, [chain]);

    return (
        <div className="h-full w-full bg-[#0f172a]/5 p-8 flex flex-col items-center overflow-y-auto">
            <style>{`
                .chain-node {
                    background: white;
                    border: 2px solid #14b8a6;
                    border-radius: 9999px;
                    padding: 12px 24px;
                    min-width: 180px;
                    text-align: center;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                    position: relative;
                    z-index: 2;
                }
                .node-label {
                    font-family: 'JetBrains Mono', monospace;
                    font-weight: 800;
                    font-size: 13px;
                    color: #134e4a;
                }
                .chain-arrow {
                    width: 2px;
                    height: 40px;
                    background: #99f6e4;
                    position: relative;
                    z-index: 1;
                }
                .chain-arrow::after {
                    content: '';
                    position: absolute;
                    bottom: -2px;
                    left: 50%;
                    transform: translateX(-50%);
                    border-left: 6px solid transparent;
                    border-right: 6px solid transparent;
                    border-top: 8px solid #99f6e4;
                }
                .proto-tag {
                    position: absolute;
                    right: -100px;
                    top: 50%;
                    transform: translateY(-50%);
                    font-size: 8px;
                    font-family: monospace;
                    color: #94a3b8;
                    white-space: nowrap;
                    background: #f8fafc;
                    padding: 2px 8px;
                    border-radius: 9999px;
                    border: 1px solid #e2e8f0;
                }
            `}</style>

            <div className="self-start mb-12">
                <h3 className="text-xs font-mono font-bold text-gray-500 uppercase tracking-widest">Prototype Inheritance Chain</h3>
            </div>

            <div className="flex flex-col items-center">
                {chain.map((level, i) => (
                    <React.Fragment key={i}>
                        <div className="chain-node">
                            <div className="node-label">{level}</div>
                            {i < chain.length - 1 && <div className="proto-tag">[[Prototype]]</div>}
                        </div>
                        {i < chain.length - 1 && <div className="chain-arrow"></div>}
                    </React.Fragment>
                ))}
            </div>

            <div className="mt-12 text-[10px] font-mono text-gray-400 text-center uppercase tracking-tighter max-w-xs">
                Property lookup walks up the chain until it finds the key or hits null
            </div>
        </div>
    );
};

export default PrototypeVisualizer;

