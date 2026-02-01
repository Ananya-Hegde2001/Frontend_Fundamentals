function calculatePerplexity(text) {
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  
  if (words.length === 0) return { perplexity: 0, vocabularySize: 0 };
  
  const freq = {};
  for (let word of words) {
    freq[word] = (freq[word] || 0) + 1;
  }
  
  const N = words.length;
  let logProbSum = 0;
  
  for (let count of Object.values(freq)) {
    const prob = count / N;
    logProbSum += Math.log2(prob);
  }
  
  const entropy = -logProbSum / N;
  const perplexity = Math.pow(2, entropy);
  
  return {
    perplexity: perplexity.toFixed(4),
    entropy: entropy.toFixed(4),
    vocabularySize: Object.keys(freq).length,
    totalWords: N,
    interpretation: perplexity > 50 ? 'High diversity' :
                    perplexity > 20 ? 'Moderate diversity' : 'Low diversity'
  };
}

console.log("\n=== BONUS Program 4: Perplexity Score ===");
console.log(calculatePerplexity("the cat sat on the mat"));