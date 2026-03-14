class TaskScheduler {
  constructor(concurrency) {
    this.concurrency = concurrency;
    this.running = 0;
    this.queue = [];
  }

  add(task) {
    return new Promise((resolve, reject) => {
      this.queue.push({ task, resolve, reject });
      this.run();
    });
  }

  run() {
    while (this.running < this.concurrency && this.queue.length > 0) {
      const { task, resolve, reject } = this.queue.shift();
      this.running++;
      Promise.resolve(task())
        .then(resolve)
        .catch(reject)
        .finally(() => {
          this.running--;
          this.run();
        });
    }
  }
}

const delay = (ms, val) =>
  new Promise((res) => setTimeout(() => res(val), ms));

const scheduler = new TaskScheduler(2); 

const tasks = [
  () => delay(1000, "Task A"),
  () => delay(500,  "Task B"),
  () => delay(800,  "Task C"),
  () => delay(300,  "Task D"),
];

Promise.all(tasks.map((t) => scheduler.add(t))).then((results) => {
  console.log("All done:", results);
});