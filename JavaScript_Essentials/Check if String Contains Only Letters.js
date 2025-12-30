function isAlpha(str) {
  return /^[a-zA-Z]+$/.test(str);
}

console.log("=== Program 1: Alphabetic Only Checker ===");
console.log(isAlpha("hello"));
console.log(isAlpha("HelloWorld"));
console.log(isAlpha("hello123"));
console.log(isAlpha("hello world"));
console.log(isAlpha("test@"));