function filterProfanity(text, maskChar = '*') {
  const profanityList = [
    'badword1', 'badword2', 'offensive', 'inappropriate'
  ];
  
  let filtered = text;
  const foundWords = [];
  
  for (let word of profanityList) {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    if (regex.test(filtered)) {
      foundWords.push(word);
      const mask = maskChar.repeat(word.length);
      filtered = filtered.replace(regex, mask);
    }
  }
  
  return {
    filtered,
    containsProfanity: foundWords.length > 0,
    foundWords,
    original: text
  };
}

console.log("\n=== Program 2: Profanity Filter ===");
console.log(filterProfanity("This is a clean message"));
console.log(filterProfanity("This contains offensive content"));