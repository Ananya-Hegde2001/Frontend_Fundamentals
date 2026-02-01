function detectLanguageAdvanced(text) {
  const languagePatterns = {
    english: {
      common: ['e', 't', 'a', 'o', 'i', 'n'],
      bigrams: ['th', 'he', 'in', 'er', 'an'],
      weight: 0
    },
    spanish: {
      common: ['e', 'a', 'o', 's', 'n', 'r'],
      bigrams: ['de', 'la', 'el', 'en', 'es'],
      weight: 0
    },
    french: {
      common: ['e', 's', 'a', 'i', 't', 'n'],
      bigrams: ['le', 'de', 'es', 'en', 'on'],
      weight: 0
    },
    german: {
      common: ['e', 'n', 'i', 's', 'r', 'a'],
      bigrams: ['en', 'er', 'ch', 'de', 'ei'],
      weight: 0
    }
  };
  
  const lowerText = text.toLowerCase();
  
  for (let [lang, pattern] of Object.entries(languagePatterns)) {
    for (let char of pattern.common) {
      const count = (lowerText.match(new RegExp(char, 'g')) || []).length;
      pattern.weight += count;
    }
    
    for (let bigram of pattern.bigrams) {
      const count = (lowerText.match(new RegExp(bigram, 'g')) || []).length;
      pattern.weight += count * 2;
    }
  }
  
  const sorted = Object.entries(languagePatterns)
    .map(([lang, data]) => ({ language: lang, score: data.weight }))
    .sort((a, b) => b.score - a.score);
  
  const total = sorted.reduce((sum, item) => sum + item.score, 0);
  
  return {
    detectedLanguage: sorted[0].language,
    confidence: total > 0 ? ((sorted[0].score / total) * 100).toFixed(1) + '%' : '0%',
    scores: sorted,
    textLength: text.length
  };
}

console.log("\n=== Program 2: Advanced Language Detection ===");
console.log(detectLanguageAdvanced("The quick brown fox jumps over the lazy dog"));
console.log(detectLanguageAdvanced("Le petit chat noir"));