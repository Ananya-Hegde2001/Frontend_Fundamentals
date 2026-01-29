function analyzeAlliteration(text) {
  const words = text.toLowerCase().match(/\b[a-z]\w*/g) || [];
  
  if (words.length < 2) {
    return { score: 0, alliterations: [], words: words.length };
  }
  
  const alliterations = [];
  let alliterationCount = 0;
  
  for (let i = 0; i < words.length - 1; i++) {
    const currentFirst = words[i][0];
    const nextFirst = words[i + 1][0];
    
    if (currentFirst === nextFirst) {
      alliterations.push(`${words[i]} ${words[i + 1]}`);
      alliterationCount++;
    }
  }
  
  const score = words.length > 1 ? alliterationCount / (words.length - 1) : 0;
  
  return {
    score: score.toFixed(3),
    percentage: (score * 100).toFixed(1) + '%',
    alliterations: [...new Set(alliterations)], 
    count: alliterationCount,
    totalWords: words.length,
    rating: score > 0.3 ? 'High' : score > 0.1 ? 'Medium' : 'Low'
  };
}

console.log("\n=== Program 2: Alliteration Analysis ===");
console.log(analyzeAlliteration("Peter Piper picked a peck of pickled peppers"));
console.log(analyzeAlliteration("The big brown bear"));