function characterReplacement(str, k) {
  let maxLength = 0;
  let maxCount = 0;
  let left = 0;
  const charCount = {};
  
  for (let right = 0; right < str.length; right++) {
    const char = str[right];
    charCount[char] = (charCount[char] || 0) + 1;
    maxCount = Math.max(maxCount, charCount[char]);
    
    while (right - left + 1 - maxCount > k) {
      charCount[str[left]]--;
      left++;
    }
    
    maxLength = Math.max(maxLength, right - left + 1);
  }
  
  return maxLength;
}

console.log("\n=== Program 3: Longest Repeating Character Replacement ===");
console.log(characterReplacement("ABAB", 2)); 
console.log(characterReplacement("AABABBA", 1)); 
console.log(characterReplacement("AAAA", 0)); 
console.log(characterReplacement("ABCDE", 1)); 