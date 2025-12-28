function equalsIgnoreCase(str1, str2) {
  return str1.toLowerCase() === str2.toLowerCase();
}

console.log("\n=== BONUS Program 9: Case Insensitive Equality ===");
console.log(equalsIgnoreCase("Hello", "hello"));
console.log(equalsIgnoreCase("JavaScript", "JAVASCRIPT"));
console.log(equalsIgnoreCase("Test", "testing"));