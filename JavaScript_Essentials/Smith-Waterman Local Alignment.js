function smithWaterman(seq1, seq2, match = 2, mismatch = -1, gap = -1) {
  const n = seq1.length;
  const m = seq2.length;
  
  const score = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));
  let maxScore = 0;
  let maxPos = [0, 0];
  
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      const matchScore = seq1[i - 1] === seq2[j - 1] ? match : mismatch;
      
      score[i][j] = Math.max(
        0,
        score[i - 1][j - 1] + matchScore,
        score[i - 1][j] + gap,
        score[i][j - 1] + gap
      );
      
      if (score[i][j] > maxScore) {
        maxScore = score[i][j];
        maxPos = [i, j];
      }
    }
  }
  
  let aligned1 = '';
  let aligned2 = '';
  let [i, j] = maxPos;
  
  while (i > 0 && j > 0 && score[i][j] > 0) {
    const matchScore = seq1[i - 1] === seq2[j - 1] ? match : mismatch;
    
    if (score[i][j] === score[i - 1][j - 1] + matchScore) {
      aligned1 = seq1[i - 1] + aligned1;
      aligned2 = seq2[j - 1] + aligned2;
      i--; j--;
    } else if (score[i][j] === score[i - 1][j] + gap) {
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
    score: maxScore,
    startPos: [i, j],
    endPos: maxPos,
    algorithm: 'Smith-Waterman',
    useCase: 'Finding similar regions in sequences'
  };
}

console.log("\n=== Program 3: Smith-Waterman Local Alignment ===");
console.log(smithWaterman("GGTTGACTA", "TGTTACGG"));