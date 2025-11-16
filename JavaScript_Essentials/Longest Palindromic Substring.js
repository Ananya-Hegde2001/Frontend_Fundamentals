function longestPalindrome(s) {
  if (s.length < 2) return s;

  let start = 0, maxLen = 1;

  function expand(l, r) {
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      if (r - l + 1 > maxLen) {
        start = l;
        maxLen = r - l + 1;
      }
      l--; r++;
    }
  }

  for (let i = 0; i < s.length; i++) {
    expand(i-1, i+1); 
    expand(i, i+1);
  }

  return s.slice(start, start + maxLen);
}

console.log(longestPalindrome("babad"));
