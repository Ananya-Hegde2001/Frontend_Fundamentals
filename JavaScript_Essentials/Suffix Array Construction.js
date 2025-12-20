function buildSuffixArray(str) {
  const n = str.length;
  const suffixes = [];
  
  for (let i = 0; i < n; i++) {
    suffixes.push({
      index: i,
      suffix: str.substring(i)
    });
  }
  
  suffixes.sort((a, b) => {
    if (a.suffix < b.suffix) return -1;
    if (a.suffix > b.suffix) return 1;
    return 0;
  });
  
  const suffixArray = suffixes.map(s => s.index);
  
  const lcp = Array(n).fill(0);
  const rank = Array(n);
  
  for (let i = 0; i < n; i++) {
    rank[suffixArray[i]] = i;
  }
  
  let h = 0;
  for (let i = 0; i < n; i++) {
    if (rank[i] > 0) {
      let j = suffixArray[rank[i] - 1];
      while (i + h < n && j + h < n && str[i + h] === str[j + h]) {
        h++;
      }
      lcp[rank[i]] = h;
      if (h > 0) h--;
    }
  }
  
  return { suffixArray, lcp, suffixes: suffixes.map(s => s.suffix) };
}

console.log("\n=== Program 2: Suffix Array Construction ===");
const sa1 = buildSuffixArray("banana");
console.log("String: banana");
console.log("Suffix Array:", sa1.suffixArray);
console.log("Suffixes:", sa1.suffixes); 
console.log("LCP Array:", sa1.lcp);