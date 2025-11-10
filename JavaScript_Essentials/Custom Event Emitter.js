class EventEmitter {
  constructor() {
    this.events = {};
  }
  on(event, listener) {
    (this.events[event] = this.events[event] || []).push(listener);
  }
  emit(event, ...args) {
    (this.events[event] || []).forEach(fn => fn(...args));
  }
}

const emitter = new EventEmitter();
emitter.on("greet", name => console.log(`Hello, ${name}!`));
emitter.emit("greet", "Ananya");
