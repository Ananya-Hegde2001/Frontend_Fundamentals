function generateTextSignature(text) {
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  const chars = text.replace(/\s/g, '');
  
  const avgWordLength = words.length > 0 
    ? (words.reduce((sum, w) => sum + w.length, 0) / words.length).toFixed(2)
    : 0;
  
  const charFreq = {};
  for (let char of chars.toLowerCase()) {
    charFreq[char] = (charFreq[char] || 0) + 1;
  }
  
  const topChars = Object.entries(charFreq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([char]) => char)
    .join('');
  
  const signature = `${words.length}W-${avgWordLength}C-${topChars}`;
  
  return {
    signature,
    words: words.length,
    characters: chars.length,
    avgWordLength,
    topCharacters: topChars,
    uniqueChars: Object.keys(charFreq).length
  };
}

console.log("\n=== BONUS Program 10: Text Signature ===");
console.log(generateTextSignature("Hello World from JavaScript"));