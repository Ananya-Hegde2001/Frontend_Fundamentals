function repeatChars(str, n) {
  return str.split('').map(char => char.repeat(n)).join('');
}

console.log("\n=== BONUS Program 7: Repeat Characters ===");
console.log(repeatChars("abc", 3));
console.log(repeatChars("hello", 2)); 
console.log(repeatChars("12", 4));