function needlemanWunsch(seq1, seq2, match = 1, mismatch = -1, gap = -2) {
  const n = seq1.length;
  const m = seq2.length;
  
  const score = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));
  const traceback = Array.from({ length: n + 1 }, () => Array(m + 1).fill(''));
  
  for (let i = 1; i <= n; i++) {
    score[i][0] = i * gap;
    traceback[i][0] = 'up';
  }
  for (let j = 1; j <= m; j++) {
    score[0][j] = j * gap;
    traceback[0][j] = 'left';
  }
  
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      const matchScore = seq1[i - 1] === seq2[j - 1] ? match : mismatch;
      
      const scores = {
        diagonal: score[i - 1][j - 1] + matchScore,
        up: score[i - 1][j] + gap,
        left: score[i][j - 1] + gap
      };
      
      const max = Math.max(scores.diagonal, scores.up, scores.left);
      score[i][j] = max;
      
      if (max === scores.diagonal) traceback[i][j] = 'diagonal';
      else if (max === scores.up) traceback[i][j] = 'up';
      else traceback[i][j] = 'left';
    }
  }
  
  let aligned1 = '';
  let aligned2 = '';
  let i = n, j = m;
  
  while (i > 0 || j > 0) {
    if (traceback[i][j] === 'diagonal') {
      aligned1 = seq1[i - 1] + aligned1;
      aligned2 = seq2[j - 1] + aligned2;
      i--; j--;
    } else if (traceback[i][j] === 'up') {
      aligned1 = seq1[i - 1] + aligned1;
      aligned2 = '-' + aligned2;
      i--;
    } else {
      aligned1 = '-' + aligned1;
      aligned2 = seq2[j - 1] + aligned2;
      j--;
    }
  }
  
  return {
    seq1,
    seq2,
    aligned1,
    aligned2,
    score: score[n][m],
    identity: (aligned1.split('').filter((c, i) => c === aligned2[i] && c !== '-').length / Math.max(n, m) * 100).toFixed(2) + '%',
    algorithm: 'Needleman-Wunsch',
    useCase: 'Bioinformatics, DNA/protein alignment'
  };
}

console.log("\n=== Program 2: Needleman-Wunsch Alignment ===");
console.log(needlemanWunsch("GCATGCU", "GATTACA"));