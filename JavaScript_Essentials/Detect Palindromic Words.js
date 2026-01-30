function findPalindromicWords(text) {
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  
  const isPalindrome = (word) => {
    return word === word.split('').reverse().join('');
  };
  
  const palindromes = words.filter(word => 
    word.length > 1 && isPalindrome(word)
  );
  
  return {
    palindromes: [...new Set(palindromes)],
    count: palindromes.length,
    totalWords: words.length,
    percentage: words.length > 0 
      ? ((palindromes.length / words.length) * 100).toFixed(1) + '%'
      : '0%'
  };
}

console.log("\n=== BONUS Program 8: Palindromic Words ===");
console.log(findPalindromicWords("A man, a plan, a canal: Panama! Racecar noon"));