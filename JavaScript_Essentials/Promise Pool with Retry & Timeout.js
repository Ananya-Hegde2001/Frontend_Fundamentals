const withTimeout = (promise, ms) => {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error(`Timeout after ${ms}ms`)), ms)
  );
  return Promise.race([promise, timeout]);
};

const withRetry = async (fn, retries = 3, delay = 500) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      console.warn(`Attempt ${attempt} failed: ${err.message}`);
      if (attempt === retries) throw err;
      await new Promise(res => setTimeout(res, delay * attempt));
    }
  }
};

const promisePool = async (tasks, concurrency) => {
  const results = [];
  const executing = new Set();

  for (const [i, task] of tasks.entries()) {
    const p = Promise.resolve().then(() => task()).then(res => {
      results[i] = { status: "fulfilled", value: res };
    }).catch(err => {
      results[i] = { status: "rejected", reason: err.message };
    });

    executing.add(p);
    p.finally(() => executing.delete(p));

    if (executing.size >= concurrency) {
      await Promise.race(executing);
    }
  }

  await Promise.all(executing);
  return results;
};

let callCount = 0;
const flakyAPI = (id) => () =>
  withTimeout(
    withRetry(() => {
      callCount++;
      return new Promise((res, rej) => {
        Math.random() < 0.5
          ? setTimeout(() => res(`✅ Data-${id}`), 200)
          : rej(new Error(`Network error on ${id}`));
      });
    }, 3, 300),
    2000
  );

const tasks = [1, 2, 3, 4, 5].map(id => flakyAPI(id));

promisePool(tasks, 2).then(results => {
  console.log("Results:", results);
  console.log("Total API calls made:", callCount);
});