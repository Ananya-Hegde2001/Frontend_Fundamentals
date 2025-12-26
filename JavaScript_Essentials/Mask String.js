function maskString(str, visibleChars = 4, maskChar = '*') {
  if (str.length <= visibleChars) return str;
  
  const visible = str.slice(-visibleChars);
  const masked = maskChar.repeat(str.length - visibleChars);
  
  return masked + visible;
}

console.log("\n=== Program 3: Mask String ===");
console.log(maskString("1234567890123456", 4)); 
console.log(maskString("myemail@example.com", 6)); 
console.log(maskString("SecretPassword", 3, '#'));