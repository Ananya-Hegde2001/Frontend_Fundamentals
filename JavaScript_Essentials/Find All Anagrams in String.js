function findAnagrams(s, p) {
  const result = [];
  const need = {};
  const window = {};
  
  for (let c of p) {
    need[c] = (need[c] || 0) + 1;
  }
  
  let left = 0, right = 0;
  let valid = 0;
  const requiredChars = Object.keys(need).length;
  
  while (right < s.length) {
    const c = s[right];
    right++;
    
    if (need[c]) {
      window[c] = (window[c] || 0) + 1;
      if (window[c] === need[c]) {
        valid++;
      }
    }
    
    while (right - left >= p.length) {
      if (valid === requiredChars) {
        result.push(left);
      }
      
      const d = s[left];
      left++;
      
      if (need[d]) {
        if (window[d] === need[d]) {
          valid--;
        }
        window[d]--;
      }
    }
  }
  
  return {
    string: s,
    pattern: p,
    anagramIndices: result,
    count: result.length,
    anagrams: result.slice(0, 5).map(i => s.substring(i, i + p.length)),
    algorithm: 'Sliding Window'
  };
}

console.log("=== Program 1: Find All Anagrams ===");
console.log(findAnagrams("cbaebabacd", "abc"));
console.log(findAnagrams("abab", "ab"));