function truncateMiddle(str, maxLength) {
  if (str.length <= maxLength) return str;
  
  const half = Math.floor((maxLength - 3) / 2);
  const start = str.slice(0, half);
  const end = str.slice(-half);
  
  return start + '...' + end;
}

console.log("\n=== Program 2: Truncate from Middle ===");
console.log(truncateMiddle("verylongfilename.txt", 15));
console.log(truncateMiddle("JavaScript Programming", 15));
console.log(truncateMiddle("Short", 20));