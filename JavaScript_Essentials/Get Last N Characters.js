function lastNChars(str, n) {
  return str.slice(-n);
}

console.log("\n=== BONUS Program 10: Get Last N Characters ===");
console.log(lastNChars("Hello World", 5)); 
console.log(lastNChars("JavaScript", 6)); 
console.log(lastNChars("abc", 2));