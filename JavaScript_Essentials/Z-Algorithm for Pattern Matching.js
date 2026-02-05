function zAlgorithmPattern(text) {
  const n = text.length;
  const z = Array(n).fill(0);
  
  let l = 0, r = 0;
  
  for (let i = 1; i < n; i++) {
    if (i <= r) {
      z[i] = Math.min(r - i + 1, z[i - l]);
    }
    
    while (i + z[i] < n && text[z[i]] === text[i + z[i]]) {
      z[i]++;
    }
    
    if (i + z[i] - 1 > r) {
      l = i;
      r = i + z[i] - 1;
    }
  }
  
  return {
    text,
    zArray: z,
    interpretation: 'z[i] = length of longest substring starting at i which is also a prefix',
    repeatedPrefixes: z.map((val, idx) => ({ index: idx, length: val }))
      .filter(item => item.length > 0)
      .slice(0, 5)
  };
}

console.log("\n=== BONUS Program 9: Z-Algorithm ===");
console.log(zAlgorithmPattern("aabcaabxaaaz"));