function boyerMooreSearch(text, pattern) {
  const m = pattern.length;
  const n = text.length;
  const matches = [];
  
  const badChar = {};
  for (let i = 0; i < m; i++) {
    badChar[pattern[i]] = i;
  }
  
  let shift = 0;
  while (shift <= n - m) {
    let j = m - 1;
    
    while (j >= 0 && pattern[j] === text[shift + j]) {
      j--;
    }
    
    if (j < 0) {
      matches.push(shift);
      shift += (shift + m < n) ? m - (badChar[text[shift + m]] || -1) : 1;
    } else {
      shift += Math.max(1, j - (badChar[text[shift + j]] || -1));
    }
  }
  
  return matches;
}

console.log("=== Program 1: Boyer-Moore String Matching ===");
console.log(boyerMooreSearch("ABAAABCDBBABCDDEBCABC", "ABC")); 
console.log(boyerMooreSearch("THIS IS A TEST TEXT", "TEST"));
console.log(boyerMooreSearch("AABAACAADAABAABA", "AABA")); 