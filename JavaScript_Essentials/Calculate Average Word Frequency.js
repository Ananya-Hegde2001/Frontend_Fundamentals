function averageWordFrequency(text) {
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  const frequency = {};
  
  for (let word of words) {
    frequency[word] = (frequency[word] || 0) + 1;
  }
  
  const frequencies = Object.values(frequency);
  const avgFreq = frequencies.length > 0 
    ? frequencies.reduce((a, b) => a + b, 0) / frequencies.length 
    : 0;
  
  const sortedByFreq = Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
  
  return {
    averageFrequency: avgFreq.toFixed(2),
    totalWords: words.length,
    uniqueWords: frequencies.length,
    topWords: sortedByFreq.map(([word, count]) => ({ word, count })),
    repetitionIndex: avgFreq.toFixed(2)
  };
}

console.log("\n=== BONUS Program 9: Average Word Frequency ===");
console.log(averageWordFrequency("the cat sat on the mat the cat"));