function mostFrequentChar(str) {
  const freq = {};
  let maxChar = '';
  let maxCount = 0;
  
  for (let char of str) {
    if (char !== ' ') {
      freq[char] = (freq[char] || 0) + 1;
      if (freq[char] > maxCount) {
        maxCount = freq[char];
        maxChar = char;
      }
    }
  }
  
  return { char: maxChar, count: maxCount };
}

console.log("\n=== Program 2: Most Frequent Character ===");
console.log(mostFrequentChar("hello world")); 
console.log(mostFrequentChar("success")); 
console.log(mostFrequentChar("aabbcc")); 