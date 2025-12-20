function fullJustify(words, maxWidth) {
  const result = [];
  let i = 0;
  
  while (i < words.length) {
    let lineWords = [];
    let lineLength = 0;
    
    while (i < words.length && lineLength + words[i].length + lineWords.length <= maxWidth) {
      lineWords.push(words[i]);
      lineLength += words[i].length;
      i++;
    }
    
    if (i === words.length || lineWords.length === 1) {
      let line = lineWords.join(' ');
      line += ' '.repeat(maxWidth - line.length);
      result.push(line);
    } else {
      let totalSpaces = maxWidth - lineLength;
      let gaps = lineWords.length - 1;
      let spacesPerGap = Math.floor(totalSpaces / gaps);
      let extraSpaces = totalSpaces % gaps;
      
      let line = '';
      for (let j = 0; j < lineWords.length - 1; j++) {
        line += lineWords[j];
        line += ' '.repeat(spacesPerGap + (j < extraSpaces ? 1 : 0));
      }
      line += lineWords[lineWords.length - 1];
      result.push(line);
    }
  }
  
  return result;
}

console.log("\n=== BONUS Program 5: Text Justification ===");
console.log(fullJustify(["This", "is", "an", "example", "of", "text", "justification."], 16));
console.log(fullJustify(["What","must","be","acknowledgment","shall","be"], 16));