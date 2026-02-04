function rabinFingerprint(text, pattern) {
  const base = 256;
  const prime = 101;
  const m = pattern.length;
  const n = text.length;
  
  if (m > n) return { matches: [], count: 0 };
  
  let patternHash = 0;
  let textHash = 0;
  let h = 1;
  
  for (let i = 0; i < m - 1; i++) {
    h = (h * base) % prime;
  }
  
  for (let i = 0; i < m; i++) {
    patternHash = (base * patternHash + pattern.charCodeAt(i)) % prime;
    textHash = (base * textHash + text.charCodeAt(i)) % prime;
  }
  
  const matches = [];
  
  for (let i = 0; i <= n - m; i++) {
    if (patternHash === textHash) {
      let match = true;
      for (let j = 0; j < m; j++) {
        if (text[i + j] !== pattern[j]) {
          match = false;
          break;
        }
      }
      if (match) {
        matches.push({ index: i, context: text.substring(Math.max(0, i - 10), Math.min(n, i + m + 10)) });
      }
    }
    
    if (i < n - m) {
      textHash = (base * (textHash - text.charCodeAt(i) * h) + text.charCodeAt(i + m)) % prime;
      if (textHash < 0) textHash += prime;
    }
  }
  
  return {
    pattern,
    matches,
    count: matches.length,
    algorithm: 'Rabin Fingerprint',
    complexity: 'O(n+m) average'
  };
}

console.log("=== Program 1: Rabin Fingerprinting ===");
console.log(rabinFingerprint("The quick brown fox jumps over the lazy dog", "fox"));