function splitIntoChunks(str, chunkSize) {
  const chunks = [];
  for (let i = 0; i < str.length; i += chunkSize) {
    chunks.push(str.slice(i, i + chunkSize));
  }
  return chunks;
}

console.log("=== Program 1: Split into Chunks ===");
console.log(splitIntoChunks("abcdefghij", 3)); 
console.log(splitIntoChunks("123456789", 2)); 
console.log(splitIntoChunks("HelloWorld", 5));