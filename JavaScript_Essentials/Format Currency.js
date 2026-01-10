function formatCurrency(amount, currency = 'USD', locale = 'en-US') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency
  }).format(amount);
}

console.log("\n=== BONUS Program 10: Format Currency ===");
console.log(formatCurrency(1234.56));
console.log(formatCurrency(9999.99, 'EUR', 'de-DE'));
console.log(formatCurrency(5000, 'INR', 'en-IN'));