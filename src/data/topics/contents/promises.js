const promisesContent = {
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
};

export default promisesContent;

