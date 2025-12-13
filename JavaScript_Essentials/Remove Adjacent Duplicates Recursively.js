function removeAdjacentDuplicates(str) {
  let result = [];
  
  for (let char of str) {
    if (result.length > 0 && result[result.length - 1] === char) {
      result.pop();
    } else {
      result.push(char);
    }
  }
  
  return result.join('');
}

console.log("\n=== Program 15: Remove Adjacent Duplicates ===");
console.log(removeAdjacentDuplicates("abbaca")); 
console.log(removeAdjacentDuplicates("azxxzy")); 
console.log(removeAdjacentDuplicates("aabbcc")); 