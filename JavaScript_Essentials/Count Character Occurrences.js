function countCharacters(str) {
  const count = {};
  
  for (let char of str.toLowerCase()) {
    if (char !== ' ') {
      count[char] = (count[char] || 0) + 1;
    }
  }
  
  return count;
}

console.log("\n=== Program 3: Character Counter ===");
console.log(countCharacters("hello world"));
console.log(countCharacters("javascript"));