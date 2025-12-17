import React, { useEffect } from 'react';
import anime from 'animejs';

const ArrayVisualizer = ({ items }) => {
    useEffect(() => {
        anime({
            targets: '.array-slot',
            scale: [0.5, 1],
            opacity: [0, 1],
            translateY: [20, 0],
            delay: anime.stagger(80),
            easing: 'easeOutElastic(1, .8)'
        });
    }, [items]);

    return (
        <div className="h-full w-full bg-[#0f172a]/5 p-8 flex flex-col items-center justify-center overflow-x-auto">
            <style>{`
                .array-container {
                    display: flex;
                    gap: 8px;
                    padding: 40px;
                    background: white;
                    border-radius: 20px;
                    border: 2px solid #e2e8f0;
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
                }
                .array-slot {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 12px;
                }
                .slot-index {
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 10px;
                    font-weight: 800;
                    color: #94a3b8;
                    background: #f8fafc;
                    padding: 2px 8px;
                    border-radius: 4px;
                }
                .slot-box {
                    width: 60px;
                    height: 60px;
                    background: #eff6ff;
                    border: 3px solid #3b82f6;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-family: 'JetBrains Mono', monospace;
                    font-weight: 700;
                    font-size: 18px;
                    color: #1e40af;
                    box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.2);
                }
                .slot-address {
                    font-family: monospace;
                    font-size: 8px;
                    color: #cbd5e1;
                }
            `}</style>

            <div className="self-start mb-12">
                <h3 className="text-xs font-mono font-bold text-gray-500 uppercase tracking-widest">Contiguous Memory Map (Array)</h3>
            </div>

            <div className="array-container">
                {items.map((item, i) => (
                    <div key={i} className="array-slot">
                        <div className="slot-index">idx_{i}</div>
                        <div className="slot-box">{item}</div>
                        <div className="slot-address">0x{((i + 1) * 16).toString(16).toUpperCase()}</div>
                    </div>
                ))}
            </div>

            <div className="mt-12 text-[10px] font-mono text-gray-400 uppercase tracking-tighter">
                Random Access Memory (O(1) Access)
            </div>
        </div>
    );
};

export default ArrayVisualizer;

