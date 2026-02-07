function damerauLevenshtein(s1, s2) {
  const len1 = s1.length;
  const len2 = s2.length;
  const maxDist = len1 + len2;
  
  const H = {};
  const getH = (i, j) => H[`${i},${j}`] || maxDist;
  const setH = (i, j, val) => { H[`${i},${j}`] = val; };
  
  setH(-1, -1, maxDist);
  
  for (let i = 0; i <= len1; i++) {
    setH(i, -1, maxDist);
    setH(i, 0, i);
  }
  
  for (let j = 0; j <= len2; j++) {
    setH(-1, j, maxDist);
    setH(0, j, j);
  }
  
  for (let i = 1; i <= len1; i++) {
    let DB = 0;
    
    for (let j = 1; j <= len2; j++) {
      let k = DB;
      let l = 0;
      let cost = 1;
      
      if (s1[i - 1] === s2[j - 1]) {
        cost = 0;
        DB = j;
      }
      
      setH(i, j, Math.min(
        getH(i - 1, j) + 1,      
        getH(i, j - 1) + 1,     
        getH(i - 1, j - 1) + cost, 
        getH(k - 1, l - 1) + (i - k - 1) + 1 + (j - l - 1)
      ));
    }
  }
  
  return {
    string1: s1,
    string2: s2,
    distance: getH(len1, len2),
    algorithm: 'Damerau-Levenshtein',
    includesTranspositions: true
  };
}

console.log("\n=== BONUS Program 4: Damerau-Levenshtein ===");
console.log(damerauLevenshtein("CA", "ABC"));