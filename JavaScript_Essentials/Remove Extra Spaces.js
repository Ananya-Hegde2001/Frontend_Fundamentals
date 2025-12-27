function removeExtraSpaces(str) {
  return str.trim().replace(/\s+/g, ' ');
}

console.log("\n=== Program 2: Remove Extra Spaces ===");
console.log(removeExtraSpaces("  Hello    World  ")); 
console.log(removeExtraSpaces("JavaScript  is   awesome"));
console.log(removeExtraSpaces("   too     many     spaces   "));