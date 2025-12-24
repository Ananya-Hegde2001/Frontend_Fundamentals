function toggleCase(str) {
  return str.split('').map(char => {
    if (char >= 'a' && char <= 'z') {
      return char.toUpperCase();
    } else if (char >= 'A' && char <= 'Z') {
      return char.toLowerCase();
    }
    return char;
  }).join('');
}

console.log("=== Program 1: Toggle Case ===");
console.log(toggleCase("Hello World")); 
console.log(toggleCase("JavaScript")); 
console.log(toggleCase("ABC123xyz"));