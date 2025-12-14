function groupAnagrams(words) {
  const map = new Map();
  
  for (let word of words) {
    const sorted = word.split('').sort().join('');
    
    if (!map.has(sorted)) {
      map.set(sorted, []);
    }
    
    map.get(sorted).push(word);
  }
  
  return Array.from(map.values());
}

console.log("\n=== Program 2: Group Anagrams ===");
console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));
console.log(groupAnagrams(["listen", "silent", "hello", "world"]));