function getAllSubstrings(str) {
  const substrings = [];
  
  for (let i = 0; i < str.length; i++) {
    for (let j = i + 1; j <= str.length; j++) {
      substrings.push(str.slice(i, j));
    }
  }
  
  return substrings;
}

console.log("\n=== Program 17: All Substrings ===");
console.log(getAllSubstrings("abc"));
console.log(getAllSubstrings("dog"));