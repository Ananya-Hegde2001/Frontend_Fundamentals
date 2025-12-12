function findLongestWord(str) {
  const words = str.split(' ');
  let longest = '';
  
  for (let word of words) {
    if (word.length > longest.length) {
      longest = word;
    }
  }
  
  return longest;
}

console.log("\n=== Program 6: Find Longest Word ===");
console.log(findLongestWord("The quick brown fox jumps")); 
console.log(findLongestWord("JavaScript is awesome"));