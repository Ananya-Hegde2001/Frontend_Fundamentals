function memoizedFibonacci() {
  let cache = {};
  return function fib(n) {
    if (n <= 1) return n;
    if (cache[n]) return cache[n];
    cache[n] = fib(n - 1) + fib(n - 2);
    return cache[n];
  };
}

const fib = memoizedFibonacci();
console.log(fib(10));
