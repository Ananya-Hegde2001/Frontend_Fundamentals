function textToBinary(text) {
  return text.split('')
             .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
             .join(' ');
}

console.log("\n=== BONUS Program 10: Text to Binary ===");
console.log(textToBinary("Hi"));
console.log(textToBinary("ABC"));