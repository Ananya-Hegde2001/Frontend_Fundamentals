function toTitleCase(str) {
  return str.toLowerCase().split(' ').map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
}

console.log("\n=== Program 4: Title Case Converter ===");
console.log(toTitleCase("hello world"));
console.log(toTitleCase("the quick brown fox")); 


function removeDuplicates(str) {
  return [...new Set(str)].join('');
}

console.log("\n=== Program 5: Remove Duplicates ===");
console.log(removeDuplicates("programming")); 
console.log(removeDuplicates("hello")); 