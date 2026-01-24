function simpleDiff(text1, text2) {
  const words1 = text1.split(/\s+/);
  const words2 = text2.split(/\s+/);
  
  const added = [];
  const removed = [];
  const unchanged = [];
  
  const set1 = new Set(words1);
  const set2 = new Set(words2);
  
  for (let word of words1) {
    if (!set2.has(word)) {
      removed.push(word);
    } else {
      unchanged.push(word);
    }
  }
  
  for (let word of words2) {
    if (!set1.has(word)) {
      added.push(word);
    }
  }
  
  return {
    added,
    removed,
    unchanged,
    changePercent: Math.round(((added.length + removed.length) / (words1.length + words2.length)) * 100)
  };
}

console.log("\n=== Program 3: Text Diff ===");
console.log(simpleDiff("The quick brown fox", "The quick red fox"));
console.log(simpleDiff("Hello world", "Hello universe"));