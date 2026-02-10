function buildLSHIndex(documents, numBands = 10, rowsPerBand = 5) {
  const numHashes = numBands * rowsPerBand;
  
  const signatures = documents.map(doc => {
    const words = doc.toLowerCase().match(/\b\w+\b/g) || [];
    const shingles = new Set();
    
    for (let i = 0; i < words.length - 2; i++) {
      shingles.add(words.slice(i, i + 3).join(' '));
    }
    
    const signature = [];
    
    for (let i = 0; i < numHashes; i++) {
      let minHash = Infinity;
      
      for (let shingle of shingles) {
        let h = i;
        for (let char of shingle) {
          h = (h * 31 + char.charCodeAt(0)) & 0x7fffffff;
        }
        minHash = Math.min(minHash, h);
      }
      
      signature.push(minHash);
    }
    
    return signature;
  });
  
  const buckets = {};
  
  for (let docIdx = 0; docIdx < documents.length; docIdx++) {
    const sig = signatures[docIdx];
    
    for (let band = 0; band < numBands; band++) {
      const start = band * rowsPerBand;
      const bandSig = sig.slice(start, start + rowsPerBand).join(',');
      const bucketKey = `${band}:${bandSig}`;
      
      if (!buckets[bucketKey]) buckets[bucketKey] = [];
      buckets[bucketKey].push(docIdx);
    }
  }
  
  const candidates = new Set();
  
  for (let bucket in buckets) {
    const docs = buckets[bucket];
    for (let i = 0; i < docs.length; i++) {
      for (let j = i + 1; j < docs.length; j++) {
        const pair = [docs[i], docs[j]].sort().join(',');
        candidates.add(pair);
      }
    }
  }
  
  return {
    documents: documents.length,
    numBands,
    rowsPerBand,
    bucketCount: Object.keys(buckets).length,
    candidatePairs: candidates.size,
    signatures: signatures.slice(0, 3),
    structure: 'LSH Index',
    algorithm: 'MinHash + LSH'
  };
}

console.log("\n=== Program 3: LSH Index ===");
console.log(buildLSHIndex([
  "The quick brown fox jumps over the lazy dog",
  "The quick brown fox jumped over the lazy dog",
  "A completely different document about cats"
]));