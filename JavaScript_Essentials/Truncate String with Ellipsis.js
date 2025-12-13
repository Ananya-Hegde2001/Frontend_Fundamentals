function truncateString(str, maxLength) {
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength - 3) + '...';
}

console.log("\n=== Program 9: Truncate String ===");
console.log(truncateString("Hello World", 8));
console.log(truncateString("JavaScript is awesome", 15)); 
console.log(truncateString("Short", 10)); 