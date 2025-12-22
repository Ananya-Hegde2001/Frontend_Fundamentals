function repeatedSubstringPattern(str) {
  const n = str.length;
  
  for (let len = 1; len <= Math.floor(n / 2); len++) {
    if (n % len === 0) {
      const pattern = str.substring(0, len);
      let repeated = pattern.repeat(n / len);
      if (repeated === str) {
        return { result: true, pattern: pattern };
      }
    }
  }
  
  return { result: false, pattern: null };
}

console.log("\n=== Program 3: Repeated Substring Pattern ===");
console.log(repeatedSubstringPattern("abab")); 
console.log(repeatedSubstringPattern("aba")); 
console.log(repeatedSubstringPattern("abcabcabc"));
console.log(repeatedSubstringPattern("aaaa"));