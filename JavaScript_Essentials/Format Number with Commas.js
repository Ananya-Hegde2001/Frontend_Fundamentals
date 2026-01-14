function formatNumberWithCommas(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

console.log("\n=== BONUS Program 5: Format Number ===");
console.log(formatNumberWithCommas(1234567)); 
console.log(formatNumberWithCommas(1000));
console.log(formatNumberWithCommas(42));


function sanitizeFilename(filename) {
  return filename
    .replace(/[^a-z0-9._-]/gi, '_')
    .replace(/_{2,}/g, '_')
    .replace(/^_|_$/g, '');
}

console.log("\n=== BONUS Program 6: Sanitize Filename ===");
console.log(sanitizeFilename("My Document (final).txt"));
console.log(sanitizeFilename("file/with\\slashes.pdf")); 
console.log(sanitizeFilename("___test___file___.doc"));