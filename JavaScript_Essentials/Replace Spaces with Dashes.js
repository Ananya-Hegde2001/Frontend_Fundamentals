function spacesToDashes(str) {
  return str.trim().replace(/\s+/g, '-').toLowerCase();
}

console.log("\n=== Program 3: Spaces to Dashes ===");
console.log(spacesToDashes("Hello World")); 
console.log(spacesToDashes("JavaScript  is  Awesome")); 
console.log(spacesToDashes("  Learn to Code  ")); 