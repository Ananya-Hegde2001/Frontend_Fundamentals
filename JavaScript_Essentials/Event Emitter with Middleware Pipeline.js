class EventEmitter {
  constructor() {
    this.events = {};
    this.middlewares = [];
  }

  use(fn) {
    this.middlewares.push(fn);
  }

  on(event, listener) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(listener);
  }

  emit(event, data) {
    const listeners = this.events[event] || [];
    let index = 0;

    const runMiddleware = (ctx, next) => {
      if (index < this.middlewares.length) {
        this.middlewares[index++](ctx, () => runMiddleware(ctx, next));
      } else {
        next(ctx);
      }
    };

    runMiddleware({ event, data }, (ctx) => {
      listeners.forEach((fn) => fn(ctx.data));
    });
  }

  off(event, listener) {
    if (this.events[event])
      this.events[event] = this.events[event].filter((l) => l !== listener);
  }
}

const emitter = new EventEmitter();

emitter.use((ctx, next) => {
  console.log(`[LOG] Event: ${ctx.event}`, ctx.data);
  next();
});

emitter.use((ctx, next) => {
  if (typeof ctx.data === "string") ctx.data = ctx.data.toUpperCase();
  next();
});

emitter.on("message", (data) => console.log("Received:", data));
emitter.emit("message", "hello world");