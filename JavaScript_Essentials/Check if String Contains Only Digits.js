function isNumericString(str) {
  return /^\d+$/.test(str);
}

console.log("\n=== BONUS Program 11: Numeric String Checker ===");
console.log(isNumericString("12345")); 
console.log(isNumericString("123abc"));
console.log(isNumericString("00000"));
console.log(isNumericString(""));