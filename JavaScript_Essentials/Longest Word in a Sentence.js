function longestWord(str) {
  const words = str.replace(/[^a-zA-Z\s]/g, '').split(' ');
  return words.reduce((longest, word) =>
    word.length > longest.length ? word : longest, '');
}

console.log(longestWord("The quick brown fox jumped")); 
console.log(longestWord("I love JavaScript programming!"));