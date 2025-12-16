function numDecodings(str) {
  if (!str || str[0] === '0') return 0;
  
  const n = str.length;
  const dp = Array(n + 1).fill(0);
  dp[0] = 1;
  dp[1] = 1;
  
  for (let i = 2; i <= n; i++) {
    const oneDigit = parseInt(str.substring(i - 1, i));
    const twoDigits = parseInt(str.substring(i - 2, i));
    
    if (oneDigit >= 1 && oneDigit <= 9) {
      dp[i] += dp[i - 1];
    }
    
    if (twoDigits >= 10 && twoDigits <= 26) {
      dp[i] += dp[i - 2];
    }
  }
  
  return dp[n];
}

console.log("\n=== Program 3: Decode Ways ===");
console.log(numDecodings("12")); 
console.log(numDecodings("226")); 
console.log(numDecodings("06")); 
console.log(numDecodings("11106")); 