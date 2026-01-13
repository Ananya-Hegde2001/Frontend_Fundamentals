function smartTruncate(str, maxLength) {
  if (str.length <= maxLength) return str;
  
  const truncated = str.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  if (lastSpace > 0) {
    return truncated.slice(0, lastSpace) + '...';
  }
  
  return truncated + '...';
}

console.log("\n=== BONUS Program 13: Smart Truncate ===");
console.log(smartTruncate("The quick brown fox jumps", 15)); 
console.log(smartTruncate("JavaScript", 20)); 
console.log(smartTruncate("Hello World from JavaScript", 12)); 