import React, { useEffect } from 'react';
import anime from 'animejs';

const DataTypeVisualizer = ({ stack, heap }) => {
    useEffect(() => {
        anime({
            targets: '.stack-item',
            translateX: [-50, 0],
            opacity: [0, 1],
            delay: anime.stagger(100),
            easing: 'easeOutQuad'
        });

        anime({
            targets: '.heap-item',
            scale: [0, 1],
            rotate: '1turn',
            opacity: [0, 1],
            delay: anime.stagger(200),
            easing: 'easeOutElastic(1, .5)'
        });
    }, [stack, heap]);

    return (
        <div className="h-full w-full flex bg-[#0f172a]/5 overflow-hidden p-4 gap-4">
            <style>{`
                .memory-lane {
                    flex: 1;
                    height: 100%;
                    background: white;
                    border-radius: 16px;
                    border: 1px solid #e2e8f0;
                    display: flex;
                    flex-col;
                    overflow: hidden;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                }
                .lane-header {
                    padding: 12px;
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 10px;
                    font-weight: 800;
                    text-transform: uppercase;
                    border-bottom: 1px solid #f1f5f9;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .stack-item {
                    margin: 8px;
                    padding: 12px;
                    background: #f8fafc;
                    border-left: 4px solid #a3e635;
                    border-radius: 4px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    box-shadow: 0 1px 2px rgba(0,0,0,0.05);
                }
                .heap-item {
                    margin: 8px;
                    padding: 16px;
                    background: #eff6ff;
                    border: 2px solid #3b82f6;
                    border-radius: 12px;
                    width: calc(100% - 16px);
                    box-shadow: 0 4px 6px rgba(59, 130, 246, 0.1);
                }
                .pointer-line {
                    color: #3b82f6;
                    font-weight: bold;
                    font-family: monospace;
                    font-size: 10px;
                }
            `}</style>

            {/* STACK */}
            <div className="memory-lane flex-col">
                <div className="lane-header text-brand-lime">
                    <div className="w-2 h-2 rounded-full bg-brand-lime"></div>
                    The Stack (Fast)
                </div>
                <div className="flex-grow overflow-y-auto p-2 flex flex-col-reverse">
                    {stack.map((s, i) => (
                        <div key={i} className="stack-item">
                            <div className="flex flex-col">
                                <span className="text-[9px] text-gray-400 font-mono uppercase">{s.name}</span>
                                <span className={`text-xs font-bold ${s.isRef ? 'text-blue-600' : 'text-gray-800'}`}>
                                    {s.value}
                                </span>
                            </div>
                            {s.isRef && <span className="pointer-line">→ HEAP</span>}
                        </div>
                    ))}
                    <div className="p-4 text-center text-[10px] text-gray-300 font-mono italic mt-4 border-t border-dashed">
                        ↑ BOTTOM_OF_STACK
                    </div>
                </div>
            </div>

            {/* HEAP */}
            <div className="memory-lane flex-col">
                <div className="lane-header text-blue-500">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    The Heap (Deep)
                </div>
                <div className="flex-grow overflow-y-auto p-2">
                    {heap.map((h, i) => (
                        <div key={i} className="heap-item">
                            <div className="text-[8px] font-mono text-blue-400 mb-2 uppercase">Address: {h.addr}</div>
                            <div className="text-sm font-bold text-blue-900 font-mono break-all bg-white p-2 rounded border border-blue-100">
                                {h.content}
                            </div>
                        </div>
                    ))}
                    {heap.length === 0 && (
                        <div className="h-full flex items-center justify-center text-gray-300 font-mono text-xs uppercase text-center p-8 opacity-50">
                            No objects currently in heap memory
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DataTypeVisualizer;

