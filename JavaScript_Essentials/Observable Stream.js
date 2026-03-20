class Observable {
  constructor(subscribeFn) { this._subscribe = subscribeFn; }

  subscribe(observer) {
    const safeObserver = {
      next:     (v) => !safeObserver.closed && observer.next?.(v),
      error:    (e) => { if (!safeObserver.closed) { safeObserver.closed = true; observer.error?.(e); }},
      complete: () => { if (!safeObserver.closed) { safeObserver.closed = true; observer.complete?.(); }},
      closed: false
    };
    return this._subscribe(safeObserver);
  }

  map(fn) {
    return new Observable(obs => this.subscribe({
      next:     v  => obs.next(fn(v)),
      error:    e  => obs.error(e),
      complete: () => obs.complete()
    }));
  }

  filter(fn) {
    return new Observable(obs => this.subscribe({
      next:     v  => fn(v) && obs.next(v),
      error:    e  => obs.error(e),
      complete: () => obs.complete()
    }));
  }

  take(n) {
    let count = 0;
    return new Observable(obs => this.subscribe({
      next: v => { if (count++ < n) { obs.next(v); if (count === n) obs.complete(); }},
      error:    e  => obs.error(e),
      complete: () => obs.complete()
    }));
  }

  debounce(ms) {
    return new Observable(obs => {
      let timer;
      return this.subscribe({
        next: v => { clearTimeout(timer); timer = setTimeout(() => obs.next(v), ms); },
        error:    e  => obs.error(e),
        complete: () => { clearTimeout(timer); obs.complete(); }
      });
    });
  }

  // Static creators
  static fromArray(arr) {
    return new Observable(obs => {
      arr.forEach(v => obs.next(v));
      obs.complete();
    });
  }

  static interval(ms) {
    return new Observable(obs => {
      let i = 0;
      const id = setInterval(() => obs.next(i++), ms);
      return () => clearInterval(id); // Teardown
    });
  }

  static merge(...streams) {
    return new Observable(obs => {
      let done = 0;
      streams.forEach(s => s.subscribe({
        next:     v  => obs.next(v),
        error:    e  => obs.error(e),
        complete: () => { if (++done === streams.length) obs.complete(); }
      }));
    });
  }
}

Observable.fromArray([1,2,3,4,5,6,7,8,9,10])
  .filter(n => n % 2 === 0)
  .map(n => n * n)
  .take(3)
  .subscribe({
    next:     v  => console.log("📦 Value:", v),
    complete: () => console.log("✅ Done!")
  });

const sub = Observable.interval(100)
  .map(i => `tick-${i}`)
  .debounce(250)
  .take(2)
  .subscribe({
    next:     v  => console.log("⏱ Debounced:", v),
    complete: () => console.log("✅ Stream complete")
  });