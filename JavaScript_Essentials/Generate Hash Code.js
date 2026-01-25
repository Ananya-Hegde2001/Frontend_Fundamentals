function simpleHashCode(str) {
  let hash = 0;
  
  if (str.length === 0) return hash;
  
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  return {
    hash,
    hex: (hash >>> 0).toString(16).toUpperCase(),
    positive: hash >>> 0,
    string: str
  };
}

console.log("\n=== Program 2: Simple Hash Code ===");
console.log(simpleHashCode("Hello World"));
console.log(simpleHashCode("JavaScript"));
console.log(simpleHashCode("abc"));