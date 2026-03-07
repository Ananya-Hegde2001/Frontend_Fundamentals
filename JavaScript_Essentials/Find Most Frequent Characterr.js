function mostFrequentChar(str) {
  const freq = {};
  str.replace(/\s/g, '').split('').forEach(char => {
    freq[char] = (freq[char] || 0) + 1;
  });
  return Object.entries(freq).reduce((a, b) => b[1] > a[1] ? b : a)[0];
}

console.log(mostFrequentChar("programming")); 
console.log(mostFrequentChar("hello world")); 
console.log(mostFrequentChar("aabbbbcc"));    