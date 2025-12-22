function removeDuplicates(str) {
  const stack = [];
  
  for (let char of str) {
    if (stack.length > 0 && stack[stack.length - 1] === char) {
      stack.pop();
    } else {
      stack.push(char);
    }
  }
  
  return stack.join('');
}

console.log("\n=== Program 2: Remove Adjacent Duplicates ===");
console.log(removeDuplicates("abbaca")); 
console.log(removeDuplicates("azxxzy")); 
console.log(removeDuplicates("aabbccdd"));
console.log(removeDuplicates("abccba")); 