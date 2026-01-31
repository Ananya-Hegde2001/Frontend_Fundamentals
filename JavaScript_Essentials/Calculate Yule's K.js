function yulesK(text) {
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  const frequency = {};
  
  for (let word of words) {
    frequency[word] = (frequency[word] || 0) + 1;
  }
  
  const freqOfFreq = {};
  for (let count of Object.values(frequency)) {
    freqOfFreq[count] = (freqOfFreq[count] || 0) + 1;
  }
  
  const N = words.length;
  let sum = 0;
  
  for (let [freq, count] of Object.entries(freqOfFreq)) {
    const r = parseInt(freq);
    sum += count * r * r;
  }
  
  const K = N > 0 ? 10000 * ((sum - N) / (N * N)) : 0;
  
  return {
    yulesK: K.toFixed(2),
    interpretation: K < 100 ? 'Very Diverse' :
                    K < 200 ? 'Diverse' :
                    K < 300 ? 'Moderate' : 'Low Diversity',
    totalWords: words.length,
    uniqueWords: Object.keys(frequency).length
  };
}

console.log("\n=== BONUS Program 7: Yule's K ===");
console.log(yulesK("The cat sat on the mat and the dog ran"));