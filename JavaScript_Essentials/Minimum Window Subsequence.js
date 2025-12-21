function minWindowSubsequence(s, t) {
  const m = s.length;
  const n = t.length;
  
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(-1));
  
  for (let i = 0; i <= m; i++) {
    dp[i][0] = i;
  }
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s[i - 1] === t[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = dp[i - 1][j];
      }
    }
  }
  
  let minLen = Infinity;
  let start = 0;
  
  for (let i = 1; i <= m; i++) {
    if (dp[i][n] !== -1) {
      let len = i - dp[i][n];
      if (len < minLen) {
        minLen = len;
        start = dp[i][n];
      }
    }
  }
  
  return minLen === Infinity ? '' : s.substring(start, start + minLen);
}

console.log("\n=== BONUS Program 5: Minimum Window Subsequence ===");
console.log(minWindowSubsequence("abcdebdde", "bde")); 
console.log(minWindowSubsequence("fgrqsqsnodwmxzkzxwqegkndaa", "kzed")); 
console.log(minWindowSubsequence("abc", "def"));