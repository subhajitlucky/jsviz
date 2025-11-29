import React, { useEffect, useRef } from 'react';

const VisualizerCanvas = ({ topicId, code, isRunning }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (isRunning && canvasRef.current) {
            // Reset canvas
            canvasRef.current.innerHTML = '';

            // Basic parsing to decide what to visualize
            if (topicId === 'variables') {
                renderVariablesViz(canvasRef.current, code);
            } else if (topicId === 'arrays') {
                renderArraysViz(canvasRef.current, code);
            } else {
                renderDefaultViz(canvasRef.current);
            }
        }
    }, [isRunning, code, topicId]);

    const renderVariablesViz = (container, code) => {
        // Simple regex to find variable declarations
        const regex = /(?:let|const|var)\s+(\w+)\s*=\s*(.+?);/g;
        let match;
        const variables = [];

        while ((match = regex.exec(code)) !== null) {
            variables.push({ name: match[1], value: match[2] });
        }

        if (variables.length === 0) {
            container.innerHTML = '<div class="text-gray-500 font-mono text-xs">NO_VARIABLES_DETECTED</div>';
            return;
        }

        variables.forEach((v, i) => {
            const box = document.createElement('div');
            box.className = 'absolute border border-brand-lime bg-brand-zinc p-4 flex flex-col items-center justify-center w-32 h-32 opacity-0 transition-all duration-500 ease-out';
            box.style.left = `${50 + (i * 150)}px`;
            box.style.top = '50px';
            box.style.transform = 'translateY(-20px)'; // Initial state for animation
            box.style.transitionDelay = `${i * 200}ms`;

            box.innerHTML = `
        <div class="text-brand-lime font-bold text-lg mb-2">${v.value}</div>
        <div class="text-gray-400 text-xs font-mono uppercase tracking-wider">${v.name}</div>
      `;

            container.appendChild(box);

            // Trigger animation
            setTimeout(() => {
                box.style.opacity = '1';
                box.style.transform = 'translateY(0)';
            }, 50); // Small delay to ensure initial styles are applied before transition
        });
    };

    const renderArraysViz = (container, code) => {
        // Mock array visualization
        const arrayContainer = document.createElement('div');
        arrayContainer.className = 'flex space-x-2 mt-10 ml-10';
        container.appendChild(arrayContainer);

        [1, 2, 3, 4, 5].forEach((num, i) => {
            const cell = document.createElement('div');
            cell.className = 'w-16 h-16 border border-brand-blue bg-brand-zinc flex items-center justify-center text-white font-bold text-xl transform scale-0 transition-transform duration-300';
            cell.style.transitionDelay = `${i * 100}ms`;
            cell.textContent = num;
            arrayContainer.appendChild(cell);

            // Trigger animation
            setTimeout(() => {
                cell.style.transform = 'scale(1)';
            }, 50);
        });

        const label = document.createElement('div');
        label.className = 'absolute top-2 left-10 text-brand-blue font-mono text-xs uppercase tracking-widest';
        label.textContent = 'Array_Index_Map';
        container.appendChild(label);
    };

    const renderDefaultViz = (container) => {
        container.innerHTML = `
      <div class="flex items-center justify-center h-full">
        <div class="text-center">
          <div class="w-16 h-16 border-2 border-dashed border-gray-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p class="text-gray-500 font-mono text-xs">VISUALIZATION_PENDING...</p>
        </div>
      </div>
    `;
    };

    return (
        <div
            ref={canvasRef}
            className="w-full h-full relative overflow-hidden"
        >
            {!isRunning && (
                <div className="absolute inset-0 flex items-center justify-center text-gray-600 font-mono text-xs pointer-events-none">
          // READY_TO_EXECUTE
                </div>
            )}
        </div>
    );
};

export default VisualizerCanvas;
