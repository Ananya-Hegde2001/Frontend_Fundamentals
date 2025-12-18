function shortestPalindrome(str) {
  if (!str) return '';
  
  const rev = str.split('').reverse().join('');
  const combined = str + '#' + rev;
  
  const lps = Array(combined.length).fill(0);
  let len = 0;
  let i = 1;
  
  while (i < combined.length) {
    if (combined[i] === combined[len]) {
      len++;
      lps[i] = len;
      i++;
    } else {
      if (len !== 0) {
        len = lps[len - 1];
      } else {
        lps[i] = 0;
        i++;
      }
    }
  }
  
  const charsToAdd = str.length - lps[combined.length - 1];
  return rev.substring(0, charsToAdd) + str;
}

console.log("\n=== BONUS Program 4: Shortest Palindrome ===");
console.log(shortestPalindrome("aacecaaa")); 
console.log(shortestPalindrome("abcd")); 
console.log(shortestPalindrome("abc")); 