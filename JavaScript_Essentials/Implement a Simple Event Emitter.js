class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(listener);
  }

  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(fn => fn(data));
    }
  }
}

const emitter = new EventEmitter();
emitter.on("greet", name => console.log(`Hello, ${name}!`));
emitter.emit("greet", "Ananya");
