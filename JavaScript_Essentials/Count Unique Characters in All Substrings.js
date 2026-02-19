function uniqueLetterString(s) {
  const n = s.length;
  let total = 0;
  
  const lastPos = Array(26).fill(-1);
  const prevPos = Array(26).fill(-1);
  
  for (let i = 0; i < n; i++) {
    const c = s.charCodeAt(i) - 65; 
    
    total += (i - lastPos[c]) * (n - i);
    
    prevPos[c] = lastPos[c];
    lastPos[c] = i;
  }
  
  return {
    string: s,
    totalCount: total,
    algorithm: 'Unique Letters (Contribution)',
    explanation: 'Count of unique chars across all substrings'
  };
}

console.log("\n=== BONUS Program 10: Unique Letter Count ===");
console.log(uniqueLetterString("ABC"));