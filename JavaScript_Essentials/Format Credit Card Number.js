function formatCreditCardNumber(cardNumber) {
  const cleaned = cardNumber.replace(/\D/g, '');
  const groups = cleaned.match(/.{1,4}/g);
  return groups ? groups.join(' ') : cleaned;
}

console.log("\n=== BONUS Program 7: Format Credit Card ===");
console.log(formatCreditCardNumber("1234567890123456"));
console.log(formatCreditCardNumber("4532-0151-1283-0366"));