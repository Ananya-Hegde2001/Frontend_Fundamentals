function checkValidString(str) {
  let minOpen = 0;
  let maxOpen = 0;
  
  for (let char of str) {
    if (char === '(') {
      minOpen++;
      maxOpen++;
    } else if (char === ')') {
      minOpen = Math.max(0, minOpen - 1);
      maxOpen--;
    } else { 
      minOpen = Math.max(0, minOpen - 1);
      maxOpen++;
    }
    
    if (maxOpen < 0) return false;
  }
  
  return minOpen === 0;
}

console.log("\n=== BONUS Program 4: Valid Parenthesis String ===");
console.log(checkValidString("()")); 
console.log(checkValidString("(*)"));
console.log(checkValidString("(*))")); 
console.log(checkValidString("((*))"));
console.log(checkValidString(")(")); 