function buildCompressedSuffixArray(text) {
  text = text + '$';
  const n = text.length;
  
  const suffixes = Array.from({ length: n }, (_, i) => i);
  suffixes.sort((a, b) => {
    for (let i = 0; i < n; i++) {
      const ca = text[a + i] || '\0';
      const cb = text[b + i] || '\0';
      if (ca !== cb) return ca.localeCompare(cb);
    }
    return 0;
  });
  
  const inverseSA = Array(n);
  suffixes.forEach((val, idx) => inverseSA[val] = idx);
  
  const lcp = Array(n).fill(0);
  let h = 0;
  
  for (let i = 0; i < n; i++) {
    if (inverseSA[i] > 0) {
      const j = suffixes[inverseSA[i] - 1];
      while (i + h < n && j + h < n && text[i + h] === text[j + h]) {
        h++;
      }
      lcp[inverseSA[i]] = h;
      if (h > 0) h--;
    }
  }
  
  const compressSA = (arr) => {
    const compressed = [];
    let current = arr[0];
    let count = 1;
    
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] === current + count) {
        count++;
      } else {
        compressed.push({ value: current, count });
        current = arr[i];
        count = 1;
      }
    }
    compressed.push({ value: current, count });
    return compressed;
  };
  
  return {
    text: text.slice(0, -1),
    suffixArray: suffixes,
    inverseSA,
    lcp,
    compressedSA: compressSA(suffixes).slice(0, 10),
    originalSize: suffixes.length * 4,
    compressionRatio: (compressSA(suffixes).length / suffixes.length).toFixed(3),
    structure: 'Compressed Suffix Array'
  };
}

console.log("=== Program 1: Compressed Suffix Array ===");
console.log(buildCompressedSuffixArray("mississippi"));