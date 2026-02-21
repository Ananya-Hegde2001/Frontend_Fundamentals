Sunction isScramble(s1, s2) {
  if (s1 === s2) return true;
  if (s1.length !== s2.length) return false;
  
  const sorted1 = s1.split('').sort().join('');
  const sorted2 = s2.split('').sort().join('');
  if (sorted1 !== sorted2) return false;
  
  const memo = new Map();
  
  const helper = (str1, str2) => {
    if (str1 === str2) return true;
    if (str1.length !== str2.length) return false;
    
    const key = str1 + '|' + str2;
    if (memo.has(key)) return memo.get(key);
    
    const n = str1.length;
    
    for (let i = 1; i < n; i++) {
      if (helper(str1.substring(0, i), str2.substring(0, i)) &&
          helper(str1.substring(i), str2.substring(i))) {
        memo.set(key, true);
        return true;
      }
      
      if (helper(str1.substring(0, i), str2.substring(n - i)) &&
          helper(str1.substring(i), str2.substring(0, n - i))) {
        memo.set(key, true);
        return true;
      }
    }
    
    memo.set(key, false);
    return false;
  };
  
  return {
    s1, s2,
    isScrambled: helper(s1, s2),
    algorithm: 'Scramble String (Recursive DP)'
  };
}

console.log("\n=== BONUS Program 6: Scramble String ===");
console.log(isScramble("great", "rgeat"));
console.log(isScramble("abcde", "caebd"));