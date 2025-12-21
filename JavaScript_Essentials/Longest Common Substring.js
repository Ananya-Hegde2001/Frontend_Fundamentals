function longestCommonSubstring(str1, str2) {
  const m = str1.length;
  const n = str2.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  
  let maxLen = 0;
  let endIndex = 0;
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
        if (dp[i][j] > maxLen) {
          maxLen = dp[i][j];
          endIndex = i;
        }
      }
    }
  }
  
  return {
    length: maxLen,
    substring: str1.substring(endIndex - maxLen, endIndex)
  };
}

console.log("\n=== Program 2: Longest Common Substring ===");
console.log(longestCommonSubstring("abcdxyz", "xyzabcd"));
console.log(longestCommonSubstring("zxabcdezy", "yzabcdezx"));
console.log(longestCommonSubstring("GeeksforGeeks", "GeeksQuiz"));