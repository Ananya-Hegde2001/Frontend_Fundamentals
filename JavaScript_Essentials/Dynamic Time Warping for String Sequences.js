function dynamicTimeWarping(seq1, seq2) {
  const n = seq1.length;
  const m = seq2.length;
  
  const dtw = Array.from({ length: n + 1 }, () => Array(m + 1).fill(Infinity));
  dtw[0][0] = 0;
  
  const similarity = (c1, c2) => c1 === c2 ? 0 : 1;
  
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      const cost = similarity(seq1[i - 1], seq2[j - 1]);
      dtw[i][j] = cost + Math.min(
        dtw[i - 1][j],    
        dtw[i][j - 1],     
        dtw[i - 1][j - 1]  
      );
    }
  }
  
  const path = [];
  let i = n, j = m;
  
  while (i > 0 && j > 0) {
    path.unshift([i - 1, j - 1]);
    
    const candidates = [
      { i: i - 1, j: j - 1, cost: dtw[i - 1][j - 1] },
      { i: i - 1, j: j, cost: dtw[i - 1][j] },
      { i: i, j: j - 1, cost: dtw[i][j - 1] }
    ];
    
    const min = candidates.reduce((a, b) => a.cost < b.cost ? a : b);
    i = min.i;
    j = min.j;
  }
  
  const normalizedDistance = dtw[n][m] / Math.max(n, m);
  
  return {
    seq1,
    seq2,
    distance: dtw[n][m],
    normalizedDistance: normalizedDistance.toFixed(4),
    alignmentPath: path.slice(0, 10), 
    pathLength: path.length,
    algorithm: 'Dynamic Time Warping',
    useCase: 'Speech recognition, gesture matching'
  };
}

console.log("=== Program 1: Dynamic Time Warping ===");
console.log(dynamicTimeWarping("kitten", "sitting"));