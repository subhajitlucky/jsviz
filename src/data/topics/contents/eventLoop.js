const eventLoopContent = {
    definition: "The Event Loop is the mechanism that allows JavaScript to perform non-blocking operations despite being single-threaded. It coordinates the execution of code, collection of events, and execution of queued sub-tasks.",

    syntax: `// No direct syntax, but understanding execution order:

console.log('1 - Synchronous');

setTimeout(() => {
  console.log('3 - Macrotask (Timer)');
}, 0);

Promise.resolve().then(() => {
  console.log('2 - Microtask (Promise)');
});

console.log('1 - Synchronous');`,

    examples: [
        {
            code: `// Execution Order
console.log('Start');

setTimeout(() => {
  console.log('Timeout');
}, 0);

Promise.resolve()
  .then(() => console.log('Promise 1'))
  .then(() => console.log('Promise 2'));

console.log('End');

// Output:
// Start
// End  
// Promise 1
// Promise 2
// Timeout`,
            explanation: "Synchronous → Microtasks → Macrotasks"
        },
        {
            code: `// Microtask vs Macrotask
setTimeout(() => console.log('Macro 1'), 0);

queueMicrotask(() => console.log('Micro 1'));

Promise.resolve().then(() => console.log('Micro 2'));

setTimeout(() => console.log('Macro 2'), 0);

// Output:
// Micro 1
// Micro 2
// Macro 1
// Macro 2`,
            explanation: "All microtasks execute before the next macrotask"
        }
    ],

    useCases: [
        "**Understanding Async Behavior**: Predict code execution order",
        "**Debugging**: Identify why callbacks execute in specific order",
        "**Performance**: Optimize by understanding task priorities",
        "**Avoiding Blocking**: Keep UI responsive during heavy operations",
        "**API Design**: Structure async APIs correctly"
    ],

    memoryModel: `**Event Loop Components:**

1. **Call Stack**: Sync code execution
2. **Web APIs**: Browser APIs (setTimeout, fetch, DOM events)
3. **Callback Queue (Macrotask Queue)**:
   - setTimeout, setInterval
   - I/O operations
   - UI rendering
4. **Microtask Queue**:
   - Promises (.then, .catch)
   - queueMicrotask
   - MutationObserver

**Execution Order:**
1. Execute all synchronous code
2. Execute ALL microtasks 
3. Render UI (if needed)
4. Execute ONE macrotask
5. Repeat from step 2`,

    visualizationType: 'eventloop'
};

export default eventLoopContent;

