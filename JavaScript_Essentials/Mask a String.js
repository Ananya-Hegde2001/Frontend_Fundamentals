function maskString(str, visibleCount = 4, maskChar = '*') {
  return str.slice(-visibleCount).padStart(str.length, maskChar);
}

console.log(maskString("1234567890123456")); 
console.log(maskString("mypassword", 3));    