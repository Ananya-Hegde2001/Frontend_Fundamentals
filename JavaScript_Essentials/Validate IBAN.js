function isValidIBAN(iban) {
  iban = iban.replace(/\s/g, '').toUpperCase();
  
  if (!/^[A-Z]{2}[0-9]{2}[A-Z0-9]+$/.test(iban)) return false;
  
  const rearranged = iban.slice(4) + iban.slice(0, 4);
  const numeric = rearranged.replace(/[A-Z]/g, char => char.charCodeAt(0) - 55);
  
  let remainder = numeric.slice(0, 9) % 97;
  
  for (let i = 9; i < numeric.length; i += 7) {
    remainder = (remainder + numeric.slice(i, i + 7)) % 97;
  }
  
  return remainder === 1;
}

console.log("\n=== BONUS Program 4: IBAN Validator ===");
console.log(isValidIBAN("GB82 WEST 1234 5698 7654 32"));
console.log(isValidIBAN("DE89370400440532013000"));
console.log(isValidIBAN("INVALID123456"));