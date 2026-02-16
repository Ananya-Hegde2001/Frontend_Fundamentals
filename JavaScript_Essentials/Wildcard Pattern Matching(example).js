function wildcardMatch(s, p) {
  const m = s.length, n = p.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(false));
  
  dp[0][0] = true;
  
  for (let j = 1; j <= n; j++) {
    if (p[j - 1] === '*') {
      dp[0][j] = dp[0][j - 1];
    }
  }
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (p[j - 1] === '*') {
        dp[i][j] = dp[i][j - 1] || dp[i - 1][j];
      } else if (p[j - 1] === '?' || s[i - 1] === p[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      }
    }
  }
  
  return {
    string: s,
    pattern: p,
    matches: dp[m][n],
    algorithm: 'Wildcard DP'
  };
}

console.log("=== Program 1: Wildcard Matching ===");
console.log(wildcardMatch("adceb", "*a*b"));
console.log(wildcardMatch("acdcb", "a*c?b"));