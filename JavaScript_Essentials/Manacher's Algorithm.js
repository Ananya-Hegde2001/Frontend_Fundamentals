function longestPalindromeManacher(str) {
  if (!str) return '';
  
  let t = '^#' + str.split('').join('#') + '#$';
  let n = t.length;
  let p = Array(n).fill(0); 
  let center = 0, right = 0;
  
  for (let i = 1; i < n - 1; i++) {
    let mirror = 2 * center - i;
    
    if (i < right) {
      p[i] = Math.min(right - i, p[mirror]);
    }
    
    while (t[i + (1 + p[i])] === t[i - (1 + p[i])]) {
      p[i]++;
    }
    
    if (i + p[i] > right) {
      center = i;
      right = i + p[i];
    }
  }
  
  let maxLen = 0;
  let centerIndex = 0;
  for (let i = 1; i < n - 1; i++) {
    if (p[i] > maxLen) {
      maxLen = p[i];
      centerIndex = i;
    }
  }
  
  let start = Math.floor((centerIndex - maxLen) / 2);
  return str.substring(start, start + maxLen);
}

console.log("\n=== Program 2: Manacher's Algorithm (O(n) Palindrome) ===");
console.log(longestPalindromeManacher("babad")); 
console.log(longestPalindromeManacher("cbbd")); 
console.log(longestPalindromeManacher("racecar")); 
console.log(longestPalindromeManacher("bananas")); 