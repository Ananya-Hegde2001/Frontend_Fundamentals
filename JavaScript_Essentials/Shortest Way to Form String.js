function shortestWay(source, target) {
  const sourceSet = new Set(source);
  
  for (let c of target) {
    if (!sourceSet.has(c)) {
      return {
        source, target,
        count: -1,
        possible: false,
        reason: `Character '${c}' not in source`
      };
    }
  }
  
  let count = 0;
  let i = 0;
  
  while (i < target.length) {
    let j = 0; 
    const startI = i;
    
    while (j < source.length && i < target.length) {
      if (source[j] === target[i]) {
        i++;
      }
      j++;
    }
    
    if (i === startI) {
      return { source, target, count: -1, possible: false };
    }
    
    count++;
  }
  
  return {
    source,
    target,
    count,
    possible: true,
    algorithm: 'Greedy Matching'
  };
}

console.log("\n=== BONUS Program 10: Shortest Way to Form String ===");
console.log(shortestWay("abc", "abcbc"));
console.log(shortestWay("abc", "acdbc"));
