function removeVowels(str) {
  return str.replace(/[aeiouAEIOU]/g, '');
}

console.log("\n=== BONUS Program 6: Remove Vowels ===");
console.log(removeVowels("Hello World"));
console.log(removeVowels("JavaScript")); 
console.log(removeVowels("aeiou"));