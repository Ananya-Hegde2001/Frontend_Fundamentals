function isEmptyOrWhitespace(str) {
  return str.trim().length === 0;
}

console.log("=== Program 1: Empty or Whitespace Checker ===");
console.log(isEmptyOrWhitespace("")); 
console.log(isEmptyOrWhitespace("   ")); 
console.log(isEmptyOrWhitespace("  \t\n  ")); 
console.log(isEmptyOrWhitespace("hello")); 
console.log(isEmptyOrWhitespace("  text  ")); 