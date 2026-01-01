function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

console.log("\n=== Program 3: Email Validator ===");
console.log(isValidEmail("test@example.com"));
console.log(isValidEmail("user.name@domain.co.in"));
console.log(isValidEmail("invalid.email@"));
console.log(isValidEmail("@domain.com"));
console.log(isValidEmail("nodomain"));