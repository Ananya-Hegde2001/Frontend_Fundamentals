function calculateUniqueness(text) {
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  const uniqueWords = new Set(words);
  
  const uniquenessRatio = words.length > 0 ? uniqueWords.size / words.length : 0;
  
  const chars = text.replace(/\s/g, '').split('');
  const uniqueChars = new Set(chars);
  const charDiversity = chars.length > 0 ? uniqueChars.size / chars.length : 0;
  
  return {
    totalWords: words.length,
    uniqueWords: uniqueWords.size,
    uniquenessRatio: uniquenessRatio.toFixed(3),
    uniquenessPercent: Math.round(uniquenessRatio * 100) + '%',
    totalChars: chars.length,
    uniqueChars: uniqueChars.size,
    charDiversity: charDiversity.toFixed(3),
    rating: uniquenessRatio > 0.7 ? 'High' : uniquenessRatio > 0.4 ? 'Medium' : 'Low'
  };
}

console.log("=== Program 1: Text Uniqueness Score ===");
console.log(calculateUniqueness("The cat sat on the mat"));
console.log(calculateUniqueness("hello hello hello world"));