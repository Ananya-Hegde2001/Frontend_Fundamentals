function calculateLexicalDensity(text) {
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  
  const functionWords = new Set([
    'a', 'an', 'the', 'and', 'or', 'but', 'if', 'then', 'than', 'of', 'at',
    'by', 'for', 'with', 'about', 'as', 'into', 'like', 'through', 'after',
    'over', 'between', 'out', 'against', 'during', 'without', 'before', 'under',
    'around', 'among', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him',
    'her', 'us', 'them', 'my', 'your', 'his', 'her', 'its', 'our', 'their',
    'this', 'that', 'these', 'those', 'is', 'am', 'are', 'was', 'were', 'be',
    'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would',
    'should', 'could', 'may', 'might', 'must', 'can', 'to', 'in', 'on'
  ]);
  
  const contentWords = words.filter(word => !functionWords.has(word));
  const density = words.length > 0 ? contentWords.length / words.length : 0;
  
  return {
    totalWords: words.length,
    contentWords: contentWords.length,
    functionWords: words.length - contentWords.length,
    lexicalDensity: density.toFixed(3),
    percentage: (density * 100).toFixed(1) + '%',
    complexity: density > 0.6 ? 'High (Academic)' : 
                 density > 0.4 ? 'Medium (Standard)' : 'Low (Conversational)'
  };
}

console.log("=== Program 1: Lexical Density ===");
console.log(calculateLexicalDensity("The cat sat on the mat"));
console.log(calculateLexicalDensity("Photosynthesis converts sunlight into chemical energy"));