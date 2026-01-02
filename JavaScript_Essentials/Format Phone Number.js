function formatPhoneNumber(str) {
  const digits = str.replace(/\D/g, '');
  
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  
  return str;
}

console.log("\n=== Program 3: Format Phone Number ===");
console.log(formatPhoneNumber("1234567890"));
console.log(formatPhoneNumber("555-123-4567"));
console.log(formatPhoneNumber("9876543210"));