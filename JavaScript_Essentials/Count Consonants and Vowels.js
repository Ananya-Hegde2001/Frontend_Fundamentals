function countConsonantsVowels(str) {
  const vowels = 'aeiouAEIOU';
  let vCount = 0;
  let cCount = 0;
  
  for (let char of str) {
    if ((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z')) {
      if (vowels.includes(char)) {
        vCount++;
      } else {
        cCount++;
      }
    }
  }
  
  return { vowels: vCount, consonants: cCount };
}

console.log("\n=== BONUS Program 6: Count Consonants & Vowels ===");
console.log(countConsonantsVowels("Hello World")); 
console.log(countConsonantsVowels("JavaScript")); 
console.log(countConsonantsVowels("aeiou"));