function toOrdinal(num) {
  const suffixes = ["th", "st", "nd", "rd"];
  const v = num % 100;
  return num + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
}

console.log("\n=== BONUS Program 11: Ordinal Numbers ===");
console.log(toOrdinal(1));
console.log(toOrdinal(2));
console.log(toOrdinal(3));
console.log(toOrdinal(4));
console.log(toOrdinal(21));
console.log(toOrdinal(42));