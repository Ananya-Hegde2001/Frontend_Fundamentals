function getInitials(name) {
  return name.trim()
             .split(/\s+/)
             .map(word => word[0].toUpperCase())
             .join('');
}

console.log("\n=== Program 2: Extract Initials ===");
console.log(getInitials("John Doe")); 
console.log(getInitials("Mary Jane Watson")); 
console.log(getInitials("  alice   bob   charlie  ")); 
console.log(getInitials("JavaScript")); 