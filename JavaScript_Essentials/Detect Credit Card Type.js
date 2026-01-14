function detectCardType(cardNumber) {
  const patterns = {
    visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
    mastercard: /^5[1-5][0-9]{14}$/,
    amex: /^3[47][0-9]{13}$/,
    discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/
  };
  
  const clean = cardNumber.replace(/\D/g, '');
  
  for (let [type, pattern] of Object.entries(patterns)) {
    if (pattern.test(clean)) {
      return type;
    }
  }
  
  return 'unknown';
}

console.log("\n=== BONUS Program 4: Detect Card Type ===");
console.log(detectCardType("4532015112830366")); 
console.log(detectCardType("5425233430109903"));
console.log(detectCardType("374245455400126"));