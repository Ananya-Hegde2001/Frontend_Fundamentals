function generateLoremIpsum(wordCount = 50) {
  const words = ['lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 
                 'elit', 'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 
                 'et', 'dolore', 'magna', 'aliqua'];
  
  let result = [];
  for (let i = 0; i < wordCount; i++) {
    result.push(words[i % words.length]);
  }
  
  return result.join(' ') + '.';
}

console.log("\n=== BONUS Program 11: Generate Lorem Ipsum ===");
console.log(generateLoremIpsum(20));