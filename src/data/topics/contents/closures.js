const closuresContent = {
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

console.log(sayHello('Alice')); // \"Hello, Alice!\"
console.log(sayHi('Bob'));      // \"Hi, Bob!\"`,
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
};

export default closuresContent;

