function generateInitialsWithDots(name) {
  return name.trim()
             .split(/\s+/)
             .map(word => word[0].toUpperCase() + '.')
             .join(' ');
}

console.log("\n=== BONUS Program 10: Initials with Dots ===");
console.log(generateInitialsWithDots("John Doe"));
console.log(generateInitialsWithDots("Mary Jane Watson"));
console.log(generateInitialsWithDots("Albert Einstein"));