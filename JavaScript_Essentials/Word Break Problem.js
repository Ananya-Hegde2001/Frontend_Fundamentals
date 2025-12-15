function wordBreak(str, wordDict) {
  const wordSet = new Set(wordDict);
  const dp = Array(str.length + 1).fill(false);
  dp[0] = true;
  
  for (let i = 1; i <= str.length; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && wordSet.has(str.substring(j, i))) {
        dp[i] = true;
        break;
      }
    }
  }
  
  return dp[str.length];
}

console.log("\n=== Program 2: Word Break ===");
console.log(wordBreak("leetcode", ["leet", "code"])); 
console.log(wordBreak("applepenapple", ["apple", "pen"])); 
console.log(wordBreak("catsandog", ["cats", "dog", "sand", "and", "cat"])); 
console.log(wordBreak("cars", ["car", "ca", "rs"])); 