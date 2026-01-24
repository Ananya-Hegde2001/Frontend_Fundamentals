function luhnCheck(cardNumber) {
  const digits = cardNumber.replace(/\D/g, '');
  
  if (digits.length < 13 || digits.length > 19) {
    return { valid: false, error: 'Invalid length' };
  }
  
  let sum = 0;
  let isEven = false;
  
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i]);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  const valid = sum % 10 === 0;
  
  return {
    valid,
    error: valid ? null : 'Failed Luhn check',
    checksum: sum % 10
  };
}

console.log("=== Program 1: Luhn Algorithm ===");
console.log(luhnCheck("4532015112830366"));
console.log(luhnCheck("1234567890123456"));
console.log(luhnCheck("5555555555554444")); 