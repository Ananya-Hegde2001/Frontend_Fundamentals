class Store {
  constructor(reducer, initialState = {}) {
    this.reducer = reducer;
    this.state = initialState;
    this.listeners = [];
    this.middlewares = [];
    this.history = [{ ...initialState }];
  }

  use(middleware) {
    this.middlewares.push(middleware);
    return this;
  }

  getState() { return { ...this.state }; }

  dispatch(action) {
    const chain = this.middlewares.reduceRight(
      (next, mw) => (act) => mw(this)(next)(act),
      (act) => {
        this.state = this.reducer(this.state, act);
        this.history.push({ ...this.state });
        this.listeners.forEach(fn => fn(this.state));
      }
    );
    chain(action);
  }

  subscribe(fn) {
    this.listeners.push(fn);
    return () => this.listeners = this.listeners.filter(l => l !== fn); 
  }

  timeTravel(index) {
    if (this.history[index]) {
      this.state = { ...this.history[index] };
      this.listeners.forEach(fn => fn(this.state));
    }
  }
}

const counterReducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT": return { ...state, count: state.count + (action.by || 1) };
    case "DECREMENT": return { ...state, count: state.count - (action.by || 1) };
    case "RESET":     return { ...state, count: 0 };
    default:          return state;
  }
};

const logger = store => next => action => {
  console.log(`[Action] ${action.type}`, "| Before:", store.getState().count);
  next(action);
  console.log(`         After:`, store.getState().count);
};

const store = new Store(counterReducer, { count: 0 }).use(logger);

const unsub = store.subscribe(state => console.log("🔔 Subscriber:", state));

store.dispatch({ type: "INCREMENT" });
store.dispatch({ type: "INCREMENT", by: 5 });
store.dispatch({ type: "DECREMENT", by: 2 });

console.log("\n⏪ Time travel to state[1]:");
store.timeTravel(1);

unsub(); 
store.dispatch({ type: "RESET" }); 