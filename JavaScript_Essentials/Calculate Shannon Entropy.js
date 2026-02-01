function calculateShannonEntropy(text) {
  const freq = {};
  
  for (let char of text) {
    freq[char] = (freq[char] || 0) + 1;
  }
  
  const len = text.length;
  let entropy = 0;
  
  for (let count of Object.values(freq)) {
    const probability = count / len;
    entropy -= probability * Math.log2(probability);
  }
  
  const maxEntropy = Math.log2(Object.keys(freq).length);
  const redundancy = maxEntropy > 0 ? 1 - (entropy / maxEntropy) : 0;
  
  return {
    entropy: entropy.toFixed(4),
    maxPossibleEntropy: maxEntropy.toFixed(4),
    redundancy: redundancy.toFixed(4),
    redundancyPercent: (redundancy * 100).toFixed(2) + '%',
    uniqueChars: Object.keys(freq).length,
    totalChars: len,
    interpretation: entropy > 4.5 ? 'High randomness' :
                    entropy > 3.5 ? 'Moderate randomness' :
                    entropy > 2.5 ? 'Low randomness' : 'Very predictable'
  };
}

console.log("=== Program 1: Shannon Entropy ===");
console.log(calculateShannonEntropy("aaaa"));
console.log(calculateShannonEntropy("abcdefgh"));
console.log(calculateShannonEntropy("aB3!xY9#qW"));