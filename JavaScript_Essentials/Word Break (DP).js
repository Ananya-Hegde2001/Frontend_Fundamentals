const wordBreak = (s, dict) => {
  let dp = Array(s.length + 1).fill(false);
  dp[0] = true;

  for (let i = 1; i <= s.length; i++) {
    for (let w of dict) {
      if (i >= w.length && dp[i - w.length] && s.slice(i - w.length, i) === w) {
        dp[i] = true;
        break;
      }
    }
  }
  return dp[s.length];
};
