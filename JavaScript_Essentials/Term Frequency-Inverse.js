function calculateTfIdf(documents) {
  const tf = documents.map(doc => {
    const words = doc.toLowerCase().match(/\b\w+\b/g) || [];
    const freq = {};
    
    for (let word of words) {
      freq[word] = (freq[word] || 0) + 1;
    }
    
    const total = words.length;
    for (let word in freq) {
      freq[word] = freq[word] / total;
    }
    
    return freq;
  });
  
  const allWords = new Set();
  documents.forEach(doc => {
    const words = new Set(doc.toLowerCase().match(/\b\w+\b/g) || []);
    words.forEach(word => allWords.add(word));
  });
  
  const idf = {};
  const numDocs = documents.length;
  
  for (let word of allWords) {
    const docsWithWord = documents.filter(doc => 
      doc.toLowerCase().includes(word)
    ).length;
    
    idf[word] = Math.log(numDocs / (1 + docsWithWord));
  }
  
  const tfidf = tf.map((docTf, docIdx) => {
    const scores = {};
    for (let word in docTf) {
      scores[word] = docTf[word] * idf[word];
    }
    
    const topWords = Object.entries(scores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([word, score]) => ({ word, score: score.toFixed(4) }));
    
    return { document: docIdx, topWords, allScores: scores };
  });
  
  return {
    tfidf,
    vocabularySize: allWords.size,
    documentCount: numDocs,
    idf: Object.fromEntries(
      Object.entries(idf).slice(0, 10).map(([k, v]) => [k, v.toFixed(4)])
    )
  };
}

console.log("\n=== Program 2: TF-IDF Calculation ===");
console.log(calculateTfIdf([
  "The cat sat on the mat",
  "The dog sat on the log",
  "Cats and dogs are pets"
]));