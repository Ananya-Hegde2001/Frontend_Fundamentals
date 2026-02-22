function maxProductWordLengths(words) {
  const n = words.length;
  const masks = Array(n).fill(0);
  
  for (let i = 0; i < n; i++) {
    for (let c of words[i]) {
      const bit = c.charCodeAt(0) - 97; // 'a' = 0, 'b' = 1, etc.
      masks[i] |= (1 << bit);
    }
  }
  
  let maxProduct = 0;
  const pairs = [];
  
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if ((masks[i] & masks[j]) === 0) {
        const product = words[i].length * words[j].length;
        if (product > maxProduct) {
          maxProduct = product;
          pairs.length = 0;
          pairs.push([words[i], words[j]]);
        } else if (product === maxProduct) {
          pairs.push([words[i], words[j]]);
        }
      }
    }
  }
  
  return {
    words: words.length,
    maxProduct,
    pairs: pairs.slice(0, 3),
    algorithm: 'Bit Manipulation',
    complexity: 'O(n^2)'
  };
}

console.log("\n=== Program 2: Max Product Word Lengths ===");
console.log(maxProductWordLengths(["abcw","baz","foo","bar","xtfn","abcdef"]));
console.log(maxProductWordLengths(["a","ab","abc","d","cd","bcd","abcd"]));
