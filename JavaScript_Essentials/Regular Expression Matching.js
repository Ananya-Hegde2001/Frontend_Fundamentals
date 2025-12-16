function isMatch(str, pattern) {
  const m = str.length;
  const n = pattern.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(false));
  
  dp[0][0] = true;
  
  for (let j = 2; j <= n; j++) {
    if (pattern[j - 1] === '*') {
      dp[0][j] = dp[0][j - 2];
    }
  }
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const currChar = str[i - 1];
      const currPattern = pattern[j - 1];
      
      if (currPattern === '.' || currPattern === currChar) {
        dp[i][j] = dp[i - 1][j - 1];
      } else if (currPattern === '*') {
        const prevPattern = pattern[j - 2];
        dp[i][j] = dp[i][j - 2];
        if (prevPattern === '.' || prevPattern === currChar) {
          dp[i][j] = dp[i][j] || dp[i - 1][j];
        }
      }
    }
  }
  
  return dp[m][n];
}

console.log("\n=== Program 2: Regular Expression Matching ===");
console.log(isMatch("aa", "a")); 
console.log(isMatch("aa", "a*")); 
console.log(isMatch("ab", ".*")); 
console.log(isMatch("aab", "c*a*b")); 
console.log(isMatch("mississippi", "mis*is*p*.")); 