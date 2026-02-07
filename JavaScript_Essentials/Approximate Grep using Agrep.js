function agrep(pattern, text, maxErrors = 1) {
  const words = text.split(/\s+/);
  const matches = [];
  
  const editDistance = (s1, s2) => {
    const m = s1.length, n = s2.length;
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
    
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (s1[i - 1] === s2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1];
        } else {
          dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
        }
      }
    }
    
    return dp[m][n];
  };
  
  words.forEach((word, idx) => {
    const dist = editDistance(pattern, word);
    if (dist <= maxErrors) {
      matches.push({
        word,
        position: idx,
        distance: dist,
        context: words.slice(Math.max(0, idx - 2), idx + 3).join(' ')
      });
    }
  });
  
  return {
    pattern,
    maxErrors,
    matches,
    matchCount: matches.length,
    algorithm: 'Agrep'
  };
}

console.log("\n=== BONUS Program 6: Approximate Grep ===");
console.log(agrep("hello", "helo world hallo greetings hello", 1));
