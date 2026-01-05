function removeConsecutiveDuplicates(str) {
  let result = '';
  for (let i = 0; i < str.length; i++) {
    if (i === 0 || str[i] !== str[i - 1]) {
      result += str[i];
    }
  }
  return result;
}

console.log("\n=== BONUS Program 9: Remove Consecutive Duplicates ===");
console.log(removeConsecutiveDuplicates("aaabbbccc"));
console.log(removeConsecutiveDuplicates("hello"));
console.log(removeConsecutiveDuplicates("bookkeeper"));