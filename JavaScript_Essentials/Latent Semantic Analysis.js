function latentSemanticAnalysis(documents) {
  const stopWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for']);
  
  const vocabulary = new Set();
  const docWords = documents.map(doc => {
    const words = doc.toLowerCase().match(/\b\w+\b/g) || [];
    return words.filter(w => !stopWords.has(w));
  });
  
  docWords.forEach(words => words.forEach(w => vocabulary.add(w)));
  
  const vocabArray = Array.from(vocabulary);
  const matrix = [];
  
  for (let term of vocabArray) {
    const row = docWords.map(words => 
      words.filter(w => w === term).length
    );
    matrix.push(row);
  }
  
  const cooccurrence = {};
  
  for (let i = 0; i < vocabArray.length; i++) {
    for (let j = i + 1; j < vocabArray.length; j++) {
      const term1 = vocabArray[i];
      const term2 = vocabArray[j];
      
      let count = 0;
      for (let docIdx = 0; docIdx < documents.length; docIdx++) {
        if (matrix[i][docIdx] > 0 && matrix[j][docIdx] > 0) {
          count++;
        }
      }
      
      if (count > 0) {
        if (!cooccurrence[term1]) cooccurrence[term1] = [];
        if (!cooccurrence[term2]) cooccurrence[term2] = [];
        
        cooccurrence[term1].push({ term: term2, count });
        cooccurrence[term2].push({ term: term1, count });
      }
    }
  }
  
  for (let term in cooccurrence) {
    cooccurrence[term].sort((a, b) => b.count - a.count);
    cooccurrence[term] = cooccurrence[term].slice(0, 3); // Top 3
  }
  
  return {
    vocabulary: vocabArray,
    vocabularySize: vocabArray.length,
    documentCount: documents.length,
    cooccurrence,
    matrix: matrix.slice(0, 5) 
  };
}

console.log("\n=== Program 3: Latent Semantic Analysis ===");
console.log(latentSemanticAnalysis([
  "machine learning is fascinating",
  "artificial intelligence and machine learning",
  "deep learning neural networks"
]));