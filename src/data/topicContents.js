// Comprehensive topic content for JS Visualizer
export const topicContents = {
    'variables': {
        definition: "Variables are containers for storing data values in JavaScript. They act as named references to values in memory.",

        syntax: `// ES6 (Modern)
let variableName = value;      // Block-scoped, reassignable
const constantName = value;    // Block-scoped, not reassignable
    
// Legacy
var oldVariable = value;       // Function-scoped, avoid in modern code`,

        examples: [
            {
                code: `// let - mutable variable
let age = 25;
age = 26; // ✓ Works
console.log(age); // 26`,
                explanation: "let allows reassignment and is block-scoped"
            },
            {
                code: `// const - immutable binding
const PI = 3.14159;
// PI = 3.14; // ✗ Error!
console.log(PI); // 3.14159`,
                explanation: "const prevents reassignment, use for values that won't change"
            },
            {
                code: `// var - function scoped (avoid)
function testVar() {
  if (true) {
    var x = 10;
  }
  console.log(x); // 10 (leaked out of block!)
}`,
                explanation: "var is function-scoped and hoisted, can cause bugs"
            }
        ],

        useCases: [
            "Use **const** by default for values that won't be reassigned",
            "Use **let** when you need to reassign (counters, accumulators)",
            "Avoid **var** in modern JavaScript to prevent scope-related bugs",
            "Use descriptive names: `userAge` instead of `x` or `temp`"
        ],

        memoryModel: `**Stack Memory:**
- Variable names are stored as references
- Primitives (numbers, strings) are stored directly in stack
- Objects/arrays store a reference (pointer) to heap memory

**Example:**
let x = 5;           // Stack: x → 5
let obj = {a: 1};    // Stack: obj → [heap address]
                     // Heap: {a: 1}`,

        visualizationType: 'variables'
    },

    'functions': {
        definition: "Functions are reusable blocks of code that perform specific tasks. They are first-class citizens in JavaScript, meaning they can be assigned to variables, passed as arguments, and returned from other functions.",

        syntax: `// Function Declaration
function functionName(parameters) {
  // code block
  return value;
}

// Function Expression
const funcName = function(parameters) {
  return value;
};

// Arrow Function (ES6)
const arrowFunc = (parameters) => {
  return value;
};

// Concise Arrow Function
const add = (a, b) => a + b;`,

        examples: [
            {
                code: `// Function Declaration
function greet(name) {
  return \`Hello, \${name}!\`;
}
console.log(greet('Alice')); // "Hello, Alice!"`,
                explanation: "Classic function syntax, hoisted to top of scope"
            },
            {
                code: `// Arrow Function
const multiply = (a, b) => a * b;
const square = x => x * x;

console.log(multiply(3, 4)); // 12
console.log(square(5));      // 25`,
                explanation: "Arrow functions have shorter syntax and lexical 'this'"
            },
            {
                code: `// Higher-Order Function
const applyOperation = (x, y, operation) => {
  return operation(x, y);
};

const result = applyOperation(5, 3, (a, b) => a + b);
console.log(result); // 8`,
                explanation: "Functions can accept other functions as parameters"
            }
        ],

        useCases: [
            "**Code Reusability**: Write once, use multiple times",
            "**Abstraction**: Hide complex logic behind simple function calls",
            "**Event Handlers**: DOM events, button clicks, form submissions",
            "**Array Methods**: map, filter, reduce for data transformation",
            "**Async Operations**: Callbacks, promises, async/await"
        ],

        memoryModel: `**Call Stack:**
Each function call creates a new execution context on the stack

**Example:**
function add(a, b) {
  return a + b;
}
function calculate() {
  const result = add(5, 3);
  return result;
}
calculate();

**Stack Frames:**
1. Global Execution Context
2. calculate() pushed
3. add(5, 3) pushed
4. add returns, popped
5. calculate returns, popped
6. Back to global`,

        visualizationType: 'callstack'
    },

    'closures': {
        definition: "A closure is a function that has access to variables from its outer (enclosing) function's scope, even after the outer function has finished executing. Closures allow functions to 'remember' their lexical environment.",

        syntax: `function outerFunction(outerVariable) {
  // Inner function has access to outerVariable
  function innerFunction(innerVariable) {
    console.log(outerVariable + innerVariable);
  }
  return innerFunction;
}

const myFunction = outerFunction(10);
myFunction(5); // Outputs: 15`,

        examples: [
            {
                code: `// Basic Closure
function createCounter() {
  let count = 0; // Private variable
  
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.getCount());  // 2`,
                explanation: "Closure creates private variables that can't be accessed directly"
            },
            {
                code: `// Factory Pattern with Closures
function createGreeter(greeting) {
  return function(name) {
    return \`\${greeting}, \${name}!\`;
  };
}

const sayHello = createGreeter('Hello');
const sayHi = createGreeter('Hi');

console.log(sayHello('Alice')); // "Hello, Alice!"
console.log(sayHi('Bob'));      // "Hi, Bob!"`,
                explanation: "Each closure maintains its own copy of the outer variable"
            }
        ],

        useCases: [
            "**Data Privacy**: Create private variables and methods",
            "**Function Factories**: Generate specialized functions",
            "**Event Handlers**: Preserve state in callbacks",
            "**Module Pattern**: Organize code with public/private APIs",
            "**Memoization**: Cache expensive function results"
        ],

        memoryModel: `**Closure Scope Chain:**
Inner function maintains reference to outer function's variables

**Memory:**
- Outer function's activation record stays in memory
- Inner function references outer scope (closure)
- Garbage collector can't free outer scope
- Memory persists until all references are gone

**Example:**
createCounter() → returns object → count stays in memory`,

        visualizationType: 'scopechain'
    },

    'promises': {
        definition: "Promises are objects representing the eventual completion (or failure) of an asynchronous operation. They provide a cleaner alternative to callbacks for handling async code.",

        syntax: `// Creating a Promise
const promise = new Promise((resolve, reject) => {
  // Async operation
  if (success) {
    resolve(value);
  } else {
    reject(error);
  }
});

// Consuming a Promise
promise
  .then(value => { /* handle success */ })
  .catch(error => { /* handle error */ })
  .finally(() => { /* cleanup */ });`,

        examples: [
            {
                code: `// Basic Promise
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { id: 1, name: 'Alice' };
      resolve(data);
    }, 1000);
  });
};

fetchData()
  .then(data => console.log(data))
  .catch(err => console.error(err));`,
                explanation: "Promise wraps async operation with resolve/reject"
            },
            {
                code: `// Promise Chaining
fetch('/api/user')
  .then(response => response.json())
  .then(user => fetch(\`/api/posts/\${user.id}\`))
  .then(response => response.json())
  .then(posts => console.log(posts))
  .catch(error => console.error(error));`,
                explanation: "Chain multiple async operations sequentially"
            },
            {
                code: `// Promise.all - Parallel Execution
const promise1 = fetch('/api/users');
const promise2 = fetch('/api/posts');
const promise3 = fetch('/api/comments');

Promise.all([promise1, promise2, promise3])
  .then(([users, posts, comments]) => {
    console.log('All data loaded!');
  })
  .catch(error => console.error(error));`,
                explanation: "Execute multiple promises in parallel, wait for all"
            }
        ],

        useCases: [
            "**API Calls**: Fetch data from servers (fetch, axios)",
            "**File Operations**: Read/write files (Node.js)",
            "**Database Queries**: Async database operations",
            "**Sequential Tasks**: Chain dependent async operations",
            "**Parallel Tasks**: Run multiple independent operations simultaneously"
        ],

        memoryModel: `**Promise States:**
1. **Pending**: Initial state, operation in progress
2. **Fulfilled**: Operation completed successfully (resolve)
3. **Rejected**: Operation failed (reject)

**Event Loop:**
- Promises use microtask queue
- Executed before the next macrotask
- Higher priority than setTimeout callbacks

**Memory:**
- Promise object stores state and result value
- Callback functions stored until promise settles
- Settled promises can be garbage collected if unreferenced`,

        visualizationType: 'eventloop'
    },

    'event-loop': {
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
    }
};

export const getTopicContent = (topicId) => {
    return topicContents[topicId] || null;
};
