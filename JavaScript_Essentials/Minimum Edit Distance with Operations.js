function minEditDistanceWithOps(str1, str2) {
  const m = str1.length;
  const n = str2.length;
  
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  const ops = Array.from({ length: m + 1 }, () => Array(n + 1).fill(''));
  
  for (let i = 0; i <= m; i++) {
    dp[i][0] = i;
    ops[i][0] = 'delete';
  }
  for (let j = 0; j <= n; j++) {
    dp[0][j] = j;
    ops[0][j] = 'insert';
  }
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
        ops[i][j] = 'match';
      } else {
        const deleteCost = dp[i - 1][j] + 1;
        const insertCost = dp[i][j - 1] + 1;
        const replaceCost = dp[i - 1][j - 1] + 1;
        
        const minCost = Math.min(deleteCost, insertCost, replaceCost);
        dp[i][j] = minCost;
        
        if (minCost === replaceCost) ops[i][j] = 'replace';
        else if (minCost === deleteCost) ops[i][j] = 'delete';
        else ops[i][j] = 'insert';
      }
    }
  }
  
  const operations = [];
  let i = m, j = n;
  
  while (i > 0 || j > 0) {
    const op = ops[i][j];
    
    if (op === 'match') {
      i--; j--;
    } else if (op === 'replace') {
      operations.unshift(`Replace '${str1[i - 1]}' with '${str2[j - 1]}' at position ${i - 1}`);
      i--; j--;
    } else if (op === 'delete') {
      operations.unshift(`Delete '${str1[i - 1]}' at position ${i - 1}`);
      i--;
    } else {
      operations.unshift(`Insert '${str2[j - 1]}' at position ${i}`);
      j--;
    }
  }
  
  return {
    str1,
    str2,
    distance: dp[m][n],
    operations: operations.slice(0, 10),
    totalOperations: operations.length
  };
}

console.log("\n=== BONUS Program 8: Edit Distance with Operations ===");
console.log(minEditDistanceWithOps("kitten", "sitting"));