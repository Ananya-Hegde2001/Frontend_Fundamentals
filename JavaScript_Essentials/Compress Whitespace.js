function compressWhitespace(str) {
  return str.replace(/\s+/g, ' ').trim();
}

console.log("\n=== BONUS Program 10: Compress Whitespace ===");
console.log(compressWhitespace("  Hello    World  \n\n  Test  "));
console.log(compressWhitespace("Multiple   spaces    here"));