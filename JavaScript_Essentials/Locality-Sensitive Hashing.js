function minHashSimilarity(text1, text2, numHashes = 100) {
  const getShingles = (text, n = 3) => {
    const shingles = new Set();
    for (let i = 0; i <= text.length - n; i++) {
      shingles.add(text.slice(i, i + n));
    }
    return shingles;
  };
  
  const shingles1 = getShingles(text1.toLowerCase());
  const shingles2 = getShingles(text2.toLowerCase());
  
  const allShingles = new Set([...shingles1, ...shingles2]);
  
  const hash = (str, seed) => {
    let h = seed;
    for (let i = 0; i < str.length; i++) {
      h = (h * 31 + str.charCodeAt(i)) & 0x7fffffff;
    }
    return h;
  };
  
  let matchingHashes = 0;
  
  for (let i = 0; i < numHashes; i++) {
    let min1 = Infinity;
    let min2 = Infinity;
    
    for (let shingle of allShingles) {
      const h = hash(shingle, i);
      if (shingles1.has(shingle)) min1 = Math.min(min1, h);
      if (shingles2.has(shingle)) min2 = Math.min(min2, h);
    }
    
    if (min1 === min2) matchingHashes++;
  }
  
  const estimatedSimilarity = matchingHashes / numHashes;
  
  const intersection = new Set([...shingles1].filter(x => shingles2.has(x)));
  const union = new Set([...shingles1, ...shingles2]);
  const actualSimilarity = intersection.size / union.size;
  
  return {
    estimatedSimilarity: estimatedSimilarity.toFixed(4),
    actualSimilarity: actualSimilarity.toFixed(4),
    error: Math.abs(estimatedSimilarity - actualSimilarity).toFixed(4),
    numHashes,
    shingles1Size: shingles1.size,
    shingles2Size: shingles2.size,
    algorithm: 'MinHash (LSH)'
  };
}

console.log("\n=== Program 3: MinHash Similarity ===");
console.log(minHashSimilarity("hello world", "hello world!"));