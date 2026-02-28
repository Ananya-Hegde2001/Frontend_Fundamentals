function countWords(str) {
  return str.trim().split(/\s+/).filter(word => word !== '').length;
}

console.log(countWords("Hello World"));           
console.log(countWords("  The quick brown fox "));
console.log(countWords(""));                       