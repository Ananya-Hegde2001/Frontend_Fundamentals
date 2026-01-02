function stringSimilarity(str1, str2) {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;
  
  if (longer.length === 0) return 100;
  
  let matches = 0;
  for (let i = 0; i < shorter.length; i++) {
    if (shorter[i] === longer[i]) {
      matches++;
    }
  }
  
  return Math.round((matches / longer.length) * 100);
}

console.log("\n=== Program 2: String Similarity ===");
console.log(stringSimilarity("hello", "hello") + "%");
console.log(stringSimilarity("hello", "hallo") + "%");
console.log(stringSimilarity("abc", "xyz") + "%");
console.log(stringSimilarity("kitten", "sitting") + "%");