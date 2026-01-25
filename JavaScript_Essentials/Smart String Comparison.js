function fuzzyCompare(str1, str2, threshold = 0.8) {
  const s1 = str1.toLowerCase().trim();
  const s2 = str2.toLowerCase().trim();
  
  if (s1 === s2) {
    return { match: true, score: 1, method: 'exact' };
  }
  
  const matrix = [];
  for (let i = 0; i <= s2.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= s1.length; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= s2.length; i++) {
    for (let j = 1; j <= s1.length; j++) {
      if (s2[i - 1] === s1[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  
  const distance = matrix[s2.length][s1.length];
  const maxLen = Math.max(s1.length, s2.length);
  const score = 1 - (distance / maxLen);
  
  return {
    match: score >= threshold,
    score: score.toFixed(3),
    distance,
    threshold,
    method: 'levenshtein'
  };
}

console.log("\n=== Program 3: Fuzzy String Comparison ===");
console.log(fuzzyCompare("JavaScript", "javascript"));
console.log(fuzzyCompare("color", "colour"));
console.log(fuzzyCompare("apple", "aple"));