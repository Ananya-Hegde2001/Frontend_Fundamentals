function shortestSuperstring(words) {
  const n = words.length;
  
  const overlap = Array.from({ length: n }, () => Array(n).fill(0));
  
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i !== j) {
        let maxOverlap = Math.min(words[i].length, words[j].length);
        for (let k = maxOverlap; k > 0; k--) {
          if (words[i].endsWith(words[j].substring(0, k))) {
            overlap[i][j] = k;
            break;
          }
        }
      }
    }
  }
  
  const dp = Array.from({ length: 1 << n }, () => Array(n).fill(Infinity));
  const parent = Array.from({ length: 1 << n }, () => Array(n).fill(-1));
  
  for (let i = 0; i < n; i++) {
    dp[1 << i][i] = words[i].length;
  }
  
  for (let mask = 1; mask < (1 << n); mask++) {
    for (let i = 0; i < n; i++) {
      if (!(mask & (1 << i)) || dp[mask][i] === Infinity) continue;
      
      for (let j = 0; j < n; j++) {
        if (mask & (1 << j)) continue;
        
        const nextMask = mask | (1 << j);
        const newLen = dp[mask][i] + words[j].length - overlap[i][j];
        
        if (newLen < dp[nextMask][j]) {
          dp[nextMask][j] = newLen;
          parent[nextMask][j] = i;
        }
      }
    }
  }
  
  const fullMask = (1 << n) - 1;
  let minLen = Infinity;
  let lastNode = -1;
  
  for (let i = 0; i < n; i++) {
    if (dp[fullMask][i] < minLen) {
      minLen = dp[fullMask][i];
      lastNode = i;
    }
  }
  
  const path = [];
  let mask = fullMask;
  let node = lastNode;
  
  while (node !== -1) {
    path.unshift(node);
    const prevNode = parent[mask][node];
    mask ^= (1 << node);
    node = prevNode;
  }
  
  let superstring = words[path[0]];
  for (let i = 1; i < path.length; i++) {
    const prev = path[i - 1];
    const curr = path[i];
    superstring += words[curr].substring(overlap[prev][curr]);
  }
  
  return {
    words,
    superstring,
    length: superstring.length,
    order: path.map(i => words[i]),
    algorithm: 'Shortest Superstring (TSP-like)',
    complexity: 'O(n^2 * 2^n)'
  };
}

console.log("=== Program 1: Shortest Superstring ===");
console.log(shortestSuperstring(["catg", "ctaagt", "gcta", "ttca"]));