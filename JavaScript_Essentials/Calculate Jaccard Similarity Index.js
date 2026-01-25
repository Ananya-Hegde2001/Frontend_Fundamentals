function jaccardSimilarity(text1, text2) {
  const getWordSet = (text) => {
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    return new Set(words);
  };
  
  const set1 = getWordSet(text1);
  const set2 = getWordSet(text2);
  
  const intersection = new Set([...set1].filter(x => set2.has(x)));
  const union = new Set([...set1, ...set2]);
  
  const similarity = intersection.size / union.size;
  
  return {
    similarity: similarity.toFixed(3),
    percentage: Math.round(similarity * 100) + '%',
    intersection: [...intersection],
    union: [...union],
    intersectionSize: intersection.size,
    unionSize: union.size
  };
}

console.log("=== Program 1: Jaccard Similarity ===");
console.log(jaccardSimilarity("The cat sat on the mat", "The cat sat on a mat"));
console.log(jaccardSimilarity("apple orange banana", "banana grape orange"));