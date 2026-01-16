function smartTitleCase(str) {
  const smallWords = /^(a|an|and|as|at|but|by|for|if|in|nor|of|on|or|so|the|to|up|yet)$/i;
  
  return str.toLowerCase()
    .split(' ')
    .map((word, index, array) => {
      if (index === 0 || index === array.length - 1) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
      if (array[index - 1] && array[index - 1].endsWith(':')) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
      if (smallWords.test(word)) {
        return word;
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

console.log("\n=== Program 2: Smart Title Case ===");
console.log(smartTitleCase("the lord of the rings")); 
console.log(smartTitleCase("a tale of two cities")); 
console.log(smartTitleCase("harry potter and the goblet of fire")); 