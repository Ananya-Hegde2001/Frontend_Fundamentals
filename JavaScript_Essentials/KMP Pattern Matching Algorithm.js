function kmpSearch(text, pattern) {
  if (!pattern) return 0;
  
  const buildLPS = (pattern) => {
    const lps = Array(pattern.length).fill(0);
    let len = 0;
    let i = 1;
    
    while (i < pattern.length) {
      if (pattern[i] === pattern[len]) {
        len++;
        lps[i] = len;
        i++;
      } else {
        if (len !== 0) {
          len = lps[len - 1];
        } else {
          lps[i] = 0;
          i++;
        }
      }
    }
    return lps;
  };
  
  const lps = buildLPS(pattern);
  const matches = [];
  let i = 0; 
  let j = 0; 
  
  while (i < text.length) {
    if (text[i] === pattern[j]) {
      i++;
      j++;
    }
    
    if (j === pattern.length) {
      matches.push(i - j);
      j = lps[j - 1];
    } else if (i < text.length && text[i] !== pattern[j]) {
      if (j !== 0) {
        j = lps[j - 1];
      } else {
        i++;
      }
    }
  }
  
  return matches;
}

console.log("=== Program 1: KMP Pattern Matching ===");
console.log(kmpSearch("ABABDABACDABABCABAB", "ABABCABAB"));
console.log(kmpSearch("AABAACAADAABAABA", "AABA"));
console.log(kmpSearch("hello world hello", "hello"));
console.log(kmpSearch("abcdefg", "xyz"));