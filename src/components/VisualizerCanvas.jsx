import React, { useState, useEffect } from 'react';
import VariableVisualizer from './visualizations/VariableVisualizer';
import DataTypeVisualizer from './visualizations/DataTypeVisualizer';
import CallStackVisualizer from './visualizations/CallStackVisualizer';
import EventLoopVisualizer from './visualizations/EventLoopVisualizer';
import PrototypeVisualizer from './visualizations/PrototypeVisualizer';
import ArrayVisualizer from './visualizations/ArrayVisualizer';
import { Cpu } from 'lucide-react';

const VisualizerCanvas = ({ topicId, code, isRunning }) => {
    const [visualization, setVisualization] = useState(null);

    useEffect(() => {
        try {
            // Logic for Variables, Scope, Operators
            if (['variables', 'variables-scope', 'operators'].includes(topicId)) {
                const varRegex = /(?:let|const|var)\s+([\w$]+)\s*=\s*([^;]+);?/g;
                let match;
                const variables = [];
                while ((match = varRegex.exec(code)) !== null) {
                    variables.push({ name: match[1], value: match[2].trim() });
                }
                setVisualization({ type: 'variables', variables });
            } 
            // Logic for Data Types (Stack vs Heap)
            else if (topicId === 'data-types') {
                const stackItems = [];
                const heapItems = [];
                const varRegex = /(?:let|const|var)\s+([\w$]+)\s*=\s*([^;]+);?/g;
                let match;
                while ((match = varRegex.exec(code)) !== null) {
                    const name = match[1];
                    const val = match[2].trim();
                    const isObj = val.startsWith('{') || val.startsWith('[') || val.includes('function') || val.includes('new ');
                    
                    if (isObj) {
                        const addr = `0x${Math.floor(Math.random()*16777215).toString(16).toUpperCase()}`;
                        stackItems.push({ name, value: addr, isRef: true });
                        heapItems.push({ addr, content: val });
                    } else {
                        stackItems.push({ name, value: val, isRef: false });
                    }
                }
                setVisualization({ type: 'datatypes', stack: stackItems, heap: heapItems });
            }
            // Logic for Call Stack / Functions
            else if (['functions-basics', 'scope-chain', 'closures', 'execution-context', 'this-binding', 'function-methods', 'arguments-rest', 'arrow-functions', 'constructor-functions', 'classes'].includes(topicId)) {
                const funcRegex = /function\s+([\w$]+)|([\w$]+)\s*\(|class\s+([\w$]+)/g;
                let match;
                const frames = ['Global Context'];
                while ((match = funcRegex.exec(code)) !== null) {
                    const name = match[1] || match[2] || match[3];
                    if (name && !['console', 'log', 'if', 'for', 'while', 'switch'].includes(name)) {
                        frames.push(`${name}()`);
                    }
                }
                setVisualization({ type: 'callstack', frames: frames.reverse() });
            }
            // Logic for Event Loop / Async
            else if (['event-loop', 'microtasks', 'promises', 'async-await', 'callbacks'].includes(topicId)) {
                setVisualization({ 
                    type: 'eventloop',
                    hasMicro: code.includes('Promise') || code.includes('await') || code.includes('then'),
                    hasMacro: code.includes('setTimeout') || code.includes('setInterval')
                });
            }
            // Logic for Prototype Chain
            else if (topicId === 'prototype-chain') {
                setVisualization({ type: 'prototype', chain: ['Instance', 'Prototype', 'Object.prototype', 'null'] });
            }
            // Logic for Arrays
            else if (topicId === 'arrays') {
                const arrayMatch = code.match(/\[(.*?)\]/);
                const items = arrayMatch ? arrayMatch[1].split(',').map(s => s.trim()) : ['1', '2', '3'];
                setVisualization({ type: 'arrays', items });
            }
            else {
                setVisualization({ type: 'default' });
            }
        } catch (err) {
            setVisualization({ type: 'error', message: 'Visualizer error.' });
        }
    }, [code, topicId]);

    const renderContent = () => {
        if (!visualization) return null;

        switch (visualization.type) {
            case 'variables':
                return <VariableVisualizer variables={visualization.variables} />;
            case 'datatypes':
                return <DataTypeVisualizer stack={visualization.stack} heap={visualization.heap} />;
            case 'callstack':
                return <CallStackVisualizer frames={visualization.frames} />;
            case 'eventloop':
                return <EventLoopVisualizer hasMicro={visualization.hasMicro} hasMacro={visualization.hasMacro} />;
            case 'prototype':
                return <PrototypeVisualizer chain={visualization.chain} />;
            case 'arrays':
                return <ArrayVisualizer items={visualization.items} />;
            case 'error':
                return (
                    <div className="flex items-center justify-center h-full p-4 text-red-400 font-mono text-xs">
                        ⚠️ {visualization.message}
                    </div>
                );
            default:
                return (
                    <div className="flex items-center justify-center h-full flex-col gap-4">
                        <div className="w-12 h-12 border-4 border-dashed border-gray-200 rounded-full animate-spin"></div>
                        <span className="text-[10px] font-mono text-gray-400 tracking-widest uppercase">Initializing_Dedicated_Vis...</span>
                    </div>
                );
        }
    };

    return (
        <div className="w-full h-full relative overflow-hidden bg-white/50">
            {renderContent()}
        </div>
    );
};

export default VisualizerCanvas;
