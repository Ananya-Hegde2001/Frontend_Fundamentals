function shortestPalindrome(s) {
  if (!s) return '';
  
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
  
  const toAdd = s.length - lps[combined.length - 1];
  const prefix = rev.substring(0, toAdd);
  
  return {
    original: s,
    shortest: prefix + s,
    added: prefix,
    addedLength: toAdd,
    algorithm: 'Shortest Palindrome (KMP)'
  };
}

console.log("\n=== BONUS Program 8: Shortest Palindrome ===");
console.log(shortestPalindrome("aacecaaa"));
console.log(shortestPalindrome("abcd"));