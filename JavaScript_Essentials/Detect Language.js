function detectLanguage(text) {
  const patterns = {
    english: /^[a-zA-Z\s.,!?'"]+$/,
    numeric: /^[0-9\s.,]+$/,
    cyrillic: /[\u0400-\u04FF]/,
    arabic: /[\u0600-\u06FF]/,
    chinese: /[\u4E00-\u9FFF]/,
    japanese: /[\u3040-\u309F\u30A0-\u30FF]/,
    korean: /[\uAC00-\uD7AF]/
  };
  
  for (let [lang, pattern] of Object.entries(patterns)) {
    if (pattern.test(text)) {
      return lang;
    }
  }
  
  return 'unknown';
}

console.log("\n=== BONUS Program 6: Language Detector ===");
console.log(detectLanguage("Hello World"));
console.log(detectLanguage("Привет мир"));
console.log(detectLanguage("你好世界"));    
console.log(detectLanguage("12345"));