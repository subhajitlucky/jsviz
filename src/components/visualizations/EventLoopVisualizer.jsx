import React, { useEffect } from 'react';
import anime from 'animejs';

const EventLoopVisualizer = ({ hasMicro, hasMacro }) => {
    useEffect(() => {
        anime({
            targets: '.loop-wheel',
            rotate: '1turn',
            duration: 3000,
            loop: true,
            easing: 'linear'
        });

        if (hasMicro) {
            anime({
                targets: '.micro-task',
                translateX: [100, 0],
                opacity: [0, 1],
                easing: 'easeOutExpo'
            });
        }

        if (hasMacro) {
            anime({
                targets: '.macro-task',
                translateX: [100, 0],
                opacity: [0, 1],
                easing: 'easeOutExpo'
            });
        }
    }, [hasMicro, hasMacro]);

    return (
        <div className="h-full w-full bg-[#0f172a]/5 p-8 flex flex-col items-center justify-center relative overflow-hidden">
            <style>{`
                .loop-center {
                    width: 140px;
                    height: 140px;
                    border: 8px solid #cbd5e1;
                    border-top-color: #a3e635;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    background: white;
                    box-shadow: 0 0 40px rgba(163, 230, 53, 0.1);
                }
                .loop-label {
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 10px;
                    font-weight: 800;
                    color: #475569;
                    text-align: center;
                }
                .queue-container {
                    width: 100%;
                    margin-top: 40px;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 24px;
                }
                .queue-box {
                    background: white;
                    border-radius: 16px;
                    padding: 20px;
                    border: 2px solid #f1f5f9;
                    min-height: 120px;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }
                .micro-task {
                    background: #f5f3ff;
                    border-left: 4px solid #8b5cf6;
                    padding: 8px 12px;
                    font-family: monospace;
                    font-size: 11px;
                    color: #5b21b6;
                    border-radius: 4px;
                }
                .macro-task {
                    background: #fff7ed;
                    border-left: 4px solid #f97316;
                    padding: 8px 12px;
                    font-family: monospace;
                    font-size: 11px;
                    color: #9a3412;
                    border-radius: 4px;
                }
            `}</style>

            <div className="loop-center loop-wheel">
                <div className="loop-label">
                    EVENT<br/>LOOP
                </div>
            </div>

            <div className="queue-container">
                <div className="queue-box">
                    <h4 className="text-[10px] font-bold text-purple-600 uppercase tracking-widest mb-2">Microtasks (Priority)</h4>
                    {hasMicro ? (
                        <div className="micro-task animate-pulse">Promise.then() callback</div>
                    ) : (
                        <div className="text-[10px] text-gray-300 font-mono italic mt-4 text-center">Empty</div>
                    )}
                </div>
                <div className="queue-box">
                    <h4 className="text-[10px] font-bold text-orange-600 uppercase tracking-widest mb-2">Macrotasks</h4>
                    {hasMacro ? (
                        <div className="macro-task">setTimeout() callback</div>
                    ) : (
                        <div className="text-[10px] text-gray-300 font-mono italic mt-4 text-center">Empty</div>
                    )}
                </div>
            </div>

            <div className="absolute bottom-4 text-[9px] font-mono text-gray-400 uppercase">
                JS Concurrency Model Simulation
            </div>
        </div>
    );
};

export default EventLoopVisualizer;

