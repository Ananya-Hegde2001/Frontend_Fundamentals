function longestPalindrome(str) {
  if (!str) return '';
  
  let longest = '';
  
  const expandAroundCenter = (left, right) => {
    while (left >= 0 && right < str.length && str[left] === str[right]) {
      left--;
      right++;
    }
    return str.slice(left + 1, right);
  };
  
  for (let i = 0; i < str.length; i++) {
    const odd = expandAroundCenter(i, i);
    const even = expandAroundCenter(i, i + 1);
    const current = odd.length > even.length ? odd : even;
    
    if (current.length > longest.length) {
      longest = current;
    }
  }
  
  return longest;
}

console.log("\n=== Program 14: Longest Palindromic Substring ===");
console.log(longestPalindrome("babad")); 
console.log(longestPalindrome("racecar")); 
console.log(longestPalindrome("abcdcba")); 