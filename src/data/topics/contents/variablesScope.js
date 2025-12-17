const variablesScope = {
    definition: "var, let, and const all declare variables, but they differ in scope (where the name is visible), hoisting/TDZ behavior, and reassignment rules. Choosing the right one avoids leaks, surprises, and accidental globals.",

    syntax: `// 1) Scope
if (true) {
  var a = 10;   // function-scoped (leaks out of the block)
  let b = 20;   // block-scoped
  const c = 30; // block-scoped
}
console.log(a); // ✅ 10
// console.log(b); // ❌ ReferenceError
// console.log(c); // ❌ ReferenceError

// 2) Reassignment
var x = 1;  x = 2;  // ✅ allowed
let y = 1;  y = 2;  // ✅ allowed
const z = 1;
// z = 2; // ❌ cannot reassign binding

// 3) Hoisting + TDZ
console.log(a); // ✅ undefined (var is hoisted & initialized)
var a = 10;

// console.log(b); // ❌ ReferenceError (TDZ)
let b = 20;

// 4) const with objects (reference is fixed, contents can mutate)
const user = { name: "Subhajit" };
user.name = "Alex"; // ✅ mutate property
// user = {};       // ❌ cannot rebind identifier
`,

    examples: [
        {
            code: `// Scope: var leaks, let/const stay in the block
if (true) {
  var a = 10;
  let b = 20;
  const c = 30;
}
console.log(a); // 10
// console.log(b); // ReferenceError
// console.log(c); // ReferenceError`,
            explanation: "`var` is function-scoped and visible outside the block; `let`/`const` are block-scoped."
        },
        {
            code: `// Reassignment rules
var x = 1;   x = 2;   // ok
let y = 1;   y = 2;   // ok
const z = 1;
// z = 2; // TypeError: cannot reassign
`,
            explanation: "`const` locks the binding; use it by default, switch to `let` only when you truly need to reassign."
        },
        {
            code: `// Hoisting and Temporal Dead Zone (TDZ)
console.log(a); // undefined (var hoists and initializes)
var a = 10;

// Accessing before init throws for let/const
// console.log(b); // ReferenceError (TDZ)
let b = 20;`,
            explanation: "`var` is hoisted and pre-initialized to undefined; `let`/`const` are hoisted but remain uninitialized (TDZ) until their line."
        },
        {
            code: `// const with objects: reference fixed, contents mutable
const user = { name: "Subhajit" };
user.name = "Alex"; // ok (mutate property)
// user = {};       // not ok (rebind)`,
            explanation: "`const` freezes the reference, not the object's internals; use Object.freeze for deep immutability."
        }
    ],

    useCases: [
        "**Use `const` by default** to signal intent and prevent accidental rebinding.",
        "**Use `let`** only when the value must change (counters, accumulators, loop indices).",
        "**Avoid `var`** in modern code to prevent block leaks and hoisting surprises.",
        "**Async loops:** prefer `let` so each iteration gets its own binding (fixes the classic 'all threes' bug)."
    ],

    memoryModel: `**Creation phase:**
- Function environment created; var bindings hoisted + initialized to undefined.
- Block environments created; let/const bindings hoisted but uninitialized (TDZ).

**Execution phase:**
- Reading let/const before initialization throws (TDZ); var reads return undefined.
- Each block/loop iteration with let/const creates a fresh lexical environment.
- const fixes the identifier → reference can't change; the pointed object can, unless frozen.`,

    visualizationType: 'scopechain'
};

export default variablesScope;

