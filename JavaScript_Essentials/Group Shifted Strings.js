function groupShiftedStrings(strings) {
  const groups = {};
  
  const getHash = (s) => {
    if (s.length === 0) return '';
    
    const shifts = [];
    for (let i = 1; i < s.length; i++) {
      let diff = s.charCodeAt(i) - s.charCodeAt(i - 1);
      if (diff < 0) diff += 26; 
      shifts.push(diff);
    }
    return shifts.join(',');
  };
  
  for (let str of strings) {
    const hash = getHash(str);
    if (!groups[hash]) {
      groups[hash] = [];
    }
    groups[hash].push(str);
  }
  
  return {
    strings: strings.length,
    groups: Object.values(groups),
    groupCount: Object.keys(groups).length,
    algorithm: 'Hash-based Grouping',
    explanation: 'Strings with same shift pattern grouped together'
  };
}

console.log("\n=== Program 3: Group Shifted Strings ===");
console.log(groupShiftedStrings(["abc","bcd","acef","xyz","az","ba","a","z"]));
