function binaryToText(binary) {
  return binary.split(' ')
               .map(bin => String.fromCharCode(parseInt(bin, 2)))
               .join('');
}

console.log("\n=== BONUS Program 9: Binary to Text ===");
console.log(binaryToText("01001000 01101001")); 
console.log(binaryToText("01000001 01000010 01000011"));