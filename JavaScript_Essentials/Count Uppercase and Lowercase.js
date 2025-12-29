function countCase(str) {
  let upper = 0, lower = 0;
  
  for (let char of str) {
    if (char >= 'A' && char <= 'Z') upper++;
    if (char >= 'a' && char <= 'z') lower++;
  }
  
  return { uppercase: upper, lowercase: lower };
}

console.log("\n=== BONUS Program 5: Count Case ===");
console.log(countCase("Hello World")); 
console.log(countCase("JavaScript"));
console.log(countCase("ABC123xyz"));