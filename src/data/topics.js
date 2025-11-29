export const topics = [
    {
        title: 'Basics',
        items: [
            { id: 'variables', title: 'Variables', description: 'Understanding let, const, and var.' },
            { id: 'datatypes', title: 'Datatypes', description: 'Primitive and non-primitive types.' },
            { id: 'operators', title: 'Operators', description: 'Arithmetic, comparison, and logical operators.' },
            { id: 'conditionals', title: 'Conditionals', description: 'If-else statements and switch cases.' },
            { id: 'loops', title: 'Loops', description: 'For, while, and do-while loops.' },
            { id: 'functions', title: 'Functions', description: 'Function declarations and expressions.' },
            { id: 'arrays', title: 'Arrays', description: 'Working with lists of data.' },
            { id: 'objects', title: 'Objects', description: 'Key-value pairs and properties.' },
        ]
    },
    {
        title: 'Intermediate',
        items: [
            { id: 'callbacks', title: 'Callbacks', description: 'Functions passed as arguments.' },
            { id: 'promises', title: 'Promises', description: 'Handling asynchronous operations.' },
            { id: 'async-await', title: 'Async/Await', description: 'Syntactic sugar for Promises.' },
            { id: 'closures', title: 'Closures', description: 'Function scope and lexical environments.' },
            { id: 'this-keyword', title: 'This Keyword', description: 'Understanding context in JavaScript.' },
            { id: 'hoisting', title: 'Hoisting', description: 'Variable and function declarations moving to top.' },
            { id: 'prototype', title: 'Prototype & Inheritance', description: 'The prototype chain.' },
            { id: 'dom', title: 'DOM Manipulation', description: 'Interacting with the document object model.' },
        ]
    },
    {
        title: 'Advanced',
        items: [
            { id: 'event-loop', title: 'Event Loop', description: 'How JS handles async code under the hood.' },
            { id: 'execution-context', title: 'Execution Context', description: 'Global and function execution contexts.' },
            { id: 'scope-chain', title: 'Scope Chain', description: 'How variable access is determined.' },
            { id: 'memory-model', title: 'Memory Model', description: 'Stack vs Heap memory.' },
            { id: 'web-apis', title: 'Web APIs', description: 'Browser provided APIs like setTimeout, fetch.' },
            { id: 'modules', title: 'Modules', description: 'Import and export syntax.' },
            { id: 'error-handling', title: 'Error Handling', description: 'Try, catch, and custom errors.' },
        ]
    }
];

export const getTopicById = (id) => {
    for (const category of topics) {
        const found = category.items.find(item => item.id === id);
        if (found) return found;
    }
    return null;
};
