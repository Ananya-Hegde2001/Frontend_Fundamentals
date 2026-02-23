function reorganizeString(s) {
  const count = {};
  for (let c of s) {
    count[c] = (count[c] || 0) + 1;
  }
  
  const maxFreq = Math.max(...Object.values(count));
  if (maxFreq > Math.ceil(s.length / 2)) {
    return { original: s, reorganized: '', possible: false };
  }
  
  const heap = Object.entries(count).sort((a, b) => b[1] - a[1]);
  
  let result = '';
  let prev = null;
  
  while (heap.length > 0) {
    const [char, freq] = heap.shift();
    result += char;
    
    if (prev && prev[1] > 0) {
      heap.push(prev);
      heap.sort((a, b) => b[1] - a[1]);
    }
    
    prev = freq > 1 ? [char, freq - 1] : null;
  }
  
  return {
    original: s,
    reorganized: result,
    possible: true,
    algorithm: 'Greedy with Heap'
  };
}

console.log("\n=== BONUS Program 8: Reorganize String ===");
console.log(reorganizeString("aab"));
console.log(reorganizeString("aaab"));
