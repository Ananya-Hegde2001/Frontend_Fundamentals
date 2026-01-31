function phoneticFingerprint(text) {
  const words = text.toLowerCase().match(/\b[a-z]+\b/g) || [];
  
  const toPhonetic = (word) => {
    return word
      .replace(/[aeiou]/g, '') 
      .replace(/(.)\1+/g, '$1') 
      .replace(/ck/g, 'k')
      .replace(/ph/g, 'f')
      .replace(/gh/g, 'f')
      .slice(0, 4); 
  };
  
  const fingerprints = words.map(word => ({
    word,
    phonetic: toPhonetic(word)
  }));
  
  const signature = fingerprints.map(f => f.phonetic).join('-');
  
  return {
    original: text,
    fingerprints,
    signature,
    words: words.length
  };
}

console.log("\n=== BONUS Program 5: Phonetic Fingerprint ===");
console.log(phoneticFingerprint("Hello World"));