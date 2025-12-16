function smallestWindowWithAllChars(str) {
  const uniqueChars = new Set(str);
  const required = uniqueChars.size;
  const charCount = {};
  
  let left = 0;
  let minLen = Infinity;
  let minStart = 0;
  let formed = 0;
  
  for (let right = 0; right < str.length; right++) {
    const char = str[right];
    charCount[char] = (charCount[char] || 0) + 1;
    
    if (charCount[char] === 1) {
      formed++;
    }
    
    while (left <= right && formed === required) {
      if (right - left + 1 < minLen) {
        minLen = right - left + 1;
        minStart = left;
      }
      
      const leftChar = str[left];
      charCount[leftChar]--;
      if (charCount[leftChar] === 0) {
        formed--;
      }
      left++;
    }
  }
  
  return minLen === Infinity ? '' : str.substring(minStart, minStart + minLen);
}

console.log("\n=== BONUS Program 4: Smallest Window with All Characters ===");
console.log(smallestWindowWithAllChars("aabcbcdbca"));
console.log(smallestWindowWithAllChars("aaab"));
console.log(smallestWindowWithAllChars("abcda"));