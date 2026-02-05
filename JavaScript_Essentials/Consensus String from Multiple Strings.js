function findConsensusString(strings) {
  if (strings.length === 0) return { consensus: '', agreement: 0 };
  
  const maxLen = Math.max(...strings.map(s => s.length));
  let consensus = '';
  let totalAgreement = 0;
  
  for (let pos = 0; pos < maxLen; pos++) {
    const chars = {};
    let count = 0;
    
    for (let str of strings) {
      if (pos < str.length) {
        const char = str[pos];
        chars[char] = (chars[char] || 0) + 1;
        count++;
      }
    }
    
    if (count === 0) break;
    
    const mostCommon = Object.entries(chars)
      .sort((a, b) => b[1] - a[1])[0];
    
    consensus += mostCommon[0];
    totalAgreement += mostCommon[1];
  }
  
  const avgAgreement = consensus.length > 0 
    ? (totalAgreement / (consensus.length * strings.length) * 100).toFixed(1)
    : 0;
  
  return {
    consensus,
    agreement: avgAgreement + '%',
    length: consensus.length,
    inputStrings: strings.length
  };
}

console.log("\n=== BONUS Program 10: Consensus String ===");
console.log(findConsensusString(["hello", "hallo", "hullo"]));