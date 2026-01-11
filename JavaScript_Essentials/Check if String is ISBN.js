function isValidISBN10(isbn) {
  const clean = isbn.replace(/[-\s]/g, '');
  if (clean.length !== 10) return false;
  
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    if (!/\d/.test(clean[i])) return false;
    sum += parseInt(clean[i]) * (10 - i);
  }
  
  const lastChar = clean[9];
  if (lastChar === 'X') {
    sum += 10;
  } else if (/\d/.test(lastChar)) {
    sum += parseInt(lastChar);
  } else {
    return false;
  }
  
  return sum % 11 === 0;
}

console.log("\n=== BONUS Program 4: ISBN Validator ===");
console.log(isValidISBN10("0-306-40615-2"));
console.log(isValidISBN10("123456789X"));
console.log(isValidISBN10("1234567890"));