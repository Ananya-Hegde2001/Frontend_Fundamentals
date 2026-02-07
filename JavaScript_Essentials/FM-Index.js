function buildFMIndex(text) {
  text = text + '$'; // Add sentinel
  
  // Build suffix array
  const suffixes = [];
  for (let i = 0; i < text.length; i++) {
    suffixes.push({ index: i, suffix: text.substring(i) });
  }
  suffixes.sort((a, b) => a.suffix.localeCompare(b.suffix));
  
  const suffixArray = suffixes.map(s => s.index);
  
  // Build BWT (last column)
  const bwt = suffixes.map(s => {
    return s.index === 0 ? '$' : text[s.index - 1];
  }).join('');
  
  // Build C array (count of chars less than)
  const alphabet = [...new Set(text)].sort();
  const C = {};
  let count = 0;
  
  for (let char of alphabet) {
    C[char] = count;
    count += text.split('').filter(c => c === char).length;
  }
  
  // Build occurrence array
  const occ = {};
  for (let char of alphabet) {
    occ[char] = Array(bwt.length + 1).fill(0);
  }
  
  for (let i = 0; i < bwt.length; i++) {
    for (let char of alphabet) {
      occ[char][i + 1] = occ[char][i] + (bwt[i] === char ? 1 : 0);
    }
  }
  
  // Search function
  const search = (pattern) => {
    let top = 0;
    let bottom = bwt.length - 1;
    
    for (let i = pattern.length - 1; i >= 0; i--) {
      const char = pattern[i];
      
      if (!C[char]) return [];
      
      top = C[char] + occ[char][top];
      bottom = C[char] + occ[char][bottom + 1] - 1;
      
      if (top > bottom) return [];
    }
    
    const positions = [];
    for (let i = top; i <= bottom; i++) {
      positions.push(suffixArray[i]);
    }
    
    return positions.sort((a, b) => a - b);
  };
  
  return {
    text: text.slice(0, -1),
    bwt,
    suffixArray,
    search,
    indexSize: bwt.length,
    structure: 'FM-Index'
  };
}

console.log("\n=== Program 2: FM-Index ===");
const fmIndex = buildFMIndex("banana");
console.log({
  text: fmIndex.text,
  bwt: fmIndex.bwt,
  searchAna: fmIndex.search("ana"),
  searchNa: fmIndex.search("na")
});