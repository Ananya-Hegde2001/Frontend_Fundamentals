function shortestPalindrome(s) {
  if (!s) return { result: '', charsAdded: 0 };
  
  const rev = s.split('').reverse().join('');
  const combined = s + '#' + rev;
  
  const lps = Array(combined.length).fill(0);
  
  for (let i = 1; i < combined.length; i++) {
    let j = lps[i - 1];
    
    while (j > 0 && combined[i] !== combined[j]) {
      j = lps[j - 1];
    }
    
    if (combined[i] === combined[j]) {
      j++;
    }
    
    lps[i] = j;
  }
  
  const longestPalindromicPrefix = lps[combined.length - 1];
  const charsToAdd = s.length - longestPalindromicPrefix;
  const addedChars = rev.substring(0, charsToAdd);
  
  return {
    original: s,
    result: addedChars + s,
    charsAdded: charsToAdd,
    addedString: addedChars,
    algorithm: 'KMP-based Shortest Palindrome'
  };
}

console.log("\n=== Program 3: Shortest Palindrome ===");
console.log(shortestPalindrome("aacecaaa"));
console.log(shortestPalindrome("abcd"));