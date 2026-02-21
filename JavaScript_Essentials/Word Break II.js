function wordBreakII(s, wordDict) {
  const wordSet = new Set(wordDict);
  const memo = new Map();
  
  const backtrack = (start) => {
    if (start === s.length) return [[]];
    if (memo.has(start)) return memo.get(start);
    
    const result = [];
    
    for (let end = start + 1; end <= s.length; end++) {
      const word = s.substring(start, end);
      
      if (wordSet.has(word)) {
        const nextSegments = backtrack(end);
        
        for (let segment of nextSegments) {
          result.push([word, ...segment]);
        }
      }
    }
    
    memo.set(start, result);
    return result;
  };
  
  const solutions = backtrack(0);
  
  return {
    string: s,
    dictionary: wordDict,
    solutions: solutions.map(sol => sol.join(' ')),
    count: solutions.length,
    algorithm: 'Word Break II (Backtracking)'
  };
}

console.log("\n=== BONUS Program 7: Word Break II ===");
console.log(wordBreakII("catsanddog", ["cat","cats","and","sand","dog"]));