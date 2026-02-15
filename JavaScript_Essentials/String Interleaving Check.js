function isInterleave(s1, s2, s3) {
  if (s1.length + s2.length !== s3.length) return false;
  
  const m = s1.length, n = s2.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(false));
  
  dp[0][0] = true;
  
  for (let i = 1; i <= m; i++) {
    dp[i][0] = dp[i - 1][0] && s1[i - 1] === s3[i - 1];
  }
  
  for (let j = 1; j <= n; j++) {
    dp[0][j] = dp[0][j - 1] && s2[j - 1] === s3[j - 1];
  }
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = (dp[i - 1][j] && s1[i - 1] === s3[i + j - 1]) ||
                 (dp[i][j - 1] && s2[j - 1] === s3[i + j - 1]);
    }
  }
  
  return {
    s1, s2, s3,
    isInterleaved: dp[m][n],
    algorithm: 'String Interleaving DP',
    complexity: 'O(m*n)'
  };
}

console.log("=== Program 1: String Interleaving ===");
console.log(isInterleave("aabcc", "dbbca", "aadbbcbcac"));
console.log(isInterleave("aabcc", "dbbca", "aadbbbaccc"));