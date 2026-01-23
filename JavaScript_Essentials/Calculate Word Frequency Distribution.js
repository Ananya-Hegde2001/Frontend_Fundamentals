function wordFrequencyDistribution(text) {
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  const freq = {};
  
  for (let word of words) {
    freq[word] = (freq[word] || 0) + 1;
  }
  
  const distribution = {};
  for (let count of Object.values(freq)) {
    distribution[count] = (distribution[count] || 0) + 1;
  }
  
  return {
    frequencies: freq,
    distribution,
    uniqueWords: Object.keys(freq).length,
    totalWords: words.length
  };
}

console.log("\n=== BONUS Program 8: Word Frequency Distribution ===");
console.log(wordFrequencyDistribution("the cat sat on the mat the cat"));