function formatUSPhone(phone) {
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.length !== 10) {
    return { valid: false, formatted: null, error: 'Must be 10 digits' };
  }
  
  const formatted = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  
  return { valid: true, formatted, error: null };
}

console.log("\n=== BONUS Program 5: US Phone Formatter ===");
console.log(formatUSPhone("5551234567")); 
console.log(formatUSPhone("555-123-4567")); 
console.log(formatUSPhone("123")); 