function findLongestWord(str) {
  const words = str.split(/\s+/);
  let longest = '';
  
  for (let word of words) {
    if (word.length > longest.length) {
      longest = word;
    }
  }
  
  return { word: longest, length: longest.length };
}

console.log("\n=== Program 3: Find Longest Word ===");
console.log(findLongestWord("The quick brown fox"));
console.log(findLongestWord("JavaScript programming"));
console.log(findLongestWord("a bb ccc"));