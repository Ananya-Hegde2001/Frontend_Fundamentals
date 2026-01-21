function diceCoefficient(str1, str2) {
  if (str1 === str2) return 100;
  if (str1.length < 2 || str2.length < 2) return 0;
  
  const getBigrams = (str) => {
    const bigrams = new Set();
    for (let i = 0; i < str.length - 1; i++) {
      bigrams.add(str.substring(i, i + 2));
    }
    return bigrams;
  };
  
  const bigrams1 = getBigrams(str1.toLowerCase());
  const bigrams2 = getBigrams(str2.toLowerCase());
  
  let intersection = 0;
  for (let bigram of bigrams1) {
    if (bigrams2.has(bigram)) intersection++;
  }
  
  const similarity = (2 * intersection) / (bigrams1.size + bigrams2.size);
  return Math.round(similarity * 100);
}

console.log("=== Program 1: Dice Coefficient Similarity ===");
console.log(diceCoefficient("night", "nacht") + "%"); 
console.log(diceCoefficient("hello", "hallo") + "%"); 
console.log(diceCoefficient("apple", "apple") + "%"); 
console.log(diceCoefficient("JavaScript", "Java") + "%");