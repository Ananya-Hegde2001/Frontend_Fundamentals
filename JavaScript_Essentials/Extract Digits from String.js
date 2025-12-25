function extractDigits(str) {
  return str.replace(/\D/g, '');
}

console.log("\n=== BONUS Program 5: Extract Digits ===");
console.log(extractDigits("abc123def456")); 
console.log(extractDigits("My number is 555-1234")); 
console.log(extractDigits("Price: $99.99"));