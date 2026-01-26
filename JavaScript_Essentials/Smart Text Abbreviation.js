function smartAbbreviate(text, maxLength) {
  if (text.length <= maxLength) return text;
  
  const words = text.split(' ');
  
  const abbreviated = words.map(word => {
    if (word.length <= 3) return word;
    
    const first = word[0];
    const last = word[word.length - 1];
    const middle = word.slice(1, -1).replace(/[aeiou]/gi, '');
    
    return first + middle + last;
  }).join(' ');
  
  if (abbreviated.length <= maxLength) {
    return abbreviated;
  }
  
  return abbreviated.slice(0, maxLength - 3) + '...';
}

console.log("\n=== Program 3: Smart Abbreviation ===");
console.log(smartAbbreviate("Beautiful morning sunshine", 15));
console.log(smartAbbreviate("JavaScript programming language", 20));
console.log(smartAbbreviate("Hello", 10));