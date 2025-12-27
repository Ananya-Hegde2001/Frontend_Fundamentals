function isAlphanumeric(str) {
  return /^[a-zA-Z0-9]+$/.test(str);
}

console.log("\n=== Program 3: Alphanumeric Checker ===");
console.log(isAlphanumeric("abc123")); 
console.log(isAlphanumeric("Hello123")); 
console.log(isAlphanumeric("hello world")); 
console.log(isAlphanumeric("test@123")); 
console.log(isAlphanumeric("NoSpecialChars"));