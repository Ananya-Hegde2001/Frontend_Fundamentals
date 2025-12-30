function countWord(str, word) {
  const regex = new RegExp('\\b' + word + '\\b', 'gi');
  const matches = str.match(regex);
  return matches ? matches.length : 0;
}

console.log("\n=== Program 3: Count Word Occurrences ===");
console.log(countWord("hello world hello", "hello")); 
console.log(countWord("The cat sat on the mat", "the"));
console.log(countWord("JavaScript is great, JavaScript rocks", "JavaScript"));
console.log(countWord("test testing", "test"));