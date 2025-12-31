function sliceBetween(str, start, end) {
  return str.slice(start, end);
}

console.log("\n=== BONUS Program 9: Slice Between Indices ===");
console.log(sliceBetween("Hello World", 0, 5)); 
console.log(sliceBetween("JavaScript", 4, 10));
console.log(sliceBetween("abcdefgh", 2, 6));