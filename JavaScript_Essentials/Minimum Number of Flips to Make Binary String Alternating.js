function minFlipsAlternating(s) {
  const n = s.length;
  
  let pattern1 = ''; 
  let pattern2 = ''; 
  
  for (let i = 0; i < n; i++) {
    pattern1 += i % 2 === 0 ? '0' : '1';
    pattern2 += i % 2 === 0 ? '1' : '0';
  }
  
  let flips1 = 0;
  let flips2 = 0;
  
  for (let i = 0; i < n; i++) {
    if (s[i] !== pattern1[i]) flips1++;
    if (s[i] !== pattern2[i]) flips2++;
  }
  
  const minFlips = Math.min(flips1, flips2);
  
  return {
    original: s,
    minFlips,
    pattern: minFlips === flips1 ? pattern1 : pattern2,
    algorithm: 'Pattern Comparison'
  };
}

console.log("\n=== BONUS Program 9: Min Flips Alternating ===");
console.log(minFlipsAlternating("111000"));
