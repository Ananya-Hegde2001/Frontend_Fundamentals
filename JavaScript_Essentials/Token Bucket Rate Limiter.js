class TokenBucket {
  constructor(capacity, refillRate) {
    this.capacity   = capacity;   // Max tokens
    this.tokens     = capacity;   // Current tokens
    this.refillRate = refillRate; // Tokens per second
    this.lastRefill = Date.now();
  }

  refill() {
    const now     = Date.now();
    const elapsed = (now - this.lastRefill) / 1000;
    this.tokens   = Math.min(
      this.capacity,
      this.tokens + elapsed * this.refillRate
    );
    this.lastRefill = now;
  }

  consume(tokens = 1) {
    this.refill();
    if (this.tokens >= tokens) {
      this.tokens -= tokens;
      return true;
    }
    return false;
  }

  waitTime(tokens = 1) {
    this.refill();
    if (this.tokens >= tokens) return 0;
    return ((tokens - this.tokens) / this.refillRate) * 1000;
  }
}

class RateLimitedAPIQueue {
  constructor(capacity, refillRate, concurrency = 2) {
    this.bucket      = new TokenBucket(capacity, refillRate);
    this.concurrency = concurrency;
    this.queue       = [];
    this.running     = 0;
    this.stats       = { success: 0, queued: 0, failed: 0 };
  }

  request(fn, cost = 1, priority = 0) {
    return new Promise((resolve, reject) => {
      this.queue.push({ fn, cost, priority, resolve, reject });
      this.queue.sort((a, b) => b.priority - a.priority); // Priority queue
      this.stats.queued++;
      this.process();
    });
  }

  async process() {
    if (this.running >= this.concurrency || !this.queue.length) return;

    const { fn, cost, resolve, reject } = this.queue[0];
    const wait = this.bucket.waitTime(cost);

    if (wait > 0) {
      console.log(`⏳ Rate limited. Waiting ${wait.toFixed(0)}ms`);
      setTimeout(() => this.process(), wait);
      return;
    }

    this.queue.shift();
    this.bucket.consume(cost);
    this.running++;

    try {
      const result = await fn();
      this.stats.success++;
      resolve(result);
    } catch (e) {
      this.stats.failed++;
      reject(e);
    } finally {
      this.running--;
      this.process();
    }
  }

  getStats() { return { ...this.stats, queueLength: this.queue.length }; }
}

// Simulate API calls
const api = new RateLimitedAPIQueue(3, 1, 2); // 3 tokens, 1/sec refill

const fakeCall = (id, ms) => () =>
  new Promise(res => setTimeout(() => res(`✅ Response-${id}`), ms));

Promise.all([
  api.request(fakeCall(1, 200), 1, 2),  // High priority
  api.request(fakeCall(2, 150), 1, 1),
  api.request(fakeCall(3, 100), 1, 0),
  api.request(fakeCall(4, 300), 2, 3),  // Costs 2 tokens, highest priority
  api.request(fakeCall(5, 200), 1, 1),
]).then(results => {
  console.log("Results:", results);
  console.log("Stats:", api.getStats());
});