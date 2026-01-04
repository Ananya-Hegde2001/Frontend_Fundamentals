function uniqueWords(str) {
  const words = str.toLowerCase()
                   .replace(/[^\w\s]/g, '')
                   .split(/\s+/)
                   .filter(word => word.length > 0);
  
  return [...new Set(words)];
}

console.log("\n=== Program 2: Extract Unique Words ===");
console.log(uniqueWords("hello world hello"));
console.log(uniqueWords("the cat sat on the mat"));
console.log(uniqueWords("apple, banana, apple, cherry"));