function isPangram(str) {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const lowerStr = str.toLowerCase();
  
  for (let char of alphabet) {
    if (!lowerStr.includes(char)) {
      return false;
    }
  }
  
  return true;
}

console.log("=== Program 1: Pangram Checker ===");
console.log(isPangram("The quick brown fox jumps over the lazy dog"));
console.log(isPangram("Hello World"));
console.log(isPangram("Pack my box with five dozen liquor jugs"));