function rabinKarp(text, pattern) {
  const d = 256;
  const q = 101;
  const m = pattern.length;
  const n = text.length;
  let p = 0;
  let t = 0;
  let h = 1;
  const matches = [];

  for (let i = 0; i < m - 1; i++) {
    h = (h * d) % q;
  }

  for (let i = 0; i < m; i++) {
    p = (d * p + pattern.charCodeAt(i)) % q;
    t = (d * t + text.charCodeAt(i)) % q;
  }

  for (let i = 0; i <= n - m; i++) {
    if (p === t) {
      let match = true;
      for (let j = 0; j < m; j++) {
        if (text[i + j] !== pattern[j]) {
          match = false;
          break;
        }
      }
      if (match) matches.push(i);
    }

    if (i < n - m) {
      t = (d * (t - text.charCodeAt(i) * h) + text.charCodeAt(i + m)) % q;
      if (t < 0) t += q;
    }
  }

  return matches;
}

console.log("=== Program 1: Rabin-Karp Pattern Matching ===");
console.log(rabinKarp("GEEKS FOR GEEKS", "GEEKS"));
console.log(rabinKarp("ABABDABACDABABCABAB", "ABAB"));
console.log(rabinKarp("hello world", "world"));