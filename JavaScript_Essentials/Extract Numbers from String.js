function extractNumbers(str) {
  const numbers = str.match(/\d+/g);
  return numbers ? numbers.map(Number) : [];
}

console.log("=== Program 1: Extract Numbers ===");
console.log(extractNumbers("abc123def456")); 
console.log(extractNumbers("I have 2 apples and 5 oranges")); 
console.log(extractNumbers("Price: $99.99"));
console.log(extractNumbers("No numbers here"));