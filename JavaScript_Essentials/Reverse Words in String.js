function reverseWords(str) {
  return str.split(' ')
            .filter(word => word.length > 0)
            .reverse()
            .join(' ');
}

console.log("\n=== BONUS Program 4: Reverse Words ===");
console.log(reverseWords("the sky is blue")); 
console.log(reverseWords("  hello world  ")); 
console.log(reverseWords("a good   example"));