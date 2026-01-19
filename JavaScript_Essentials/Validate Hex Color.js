function isValidHexColor(hex) {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
}

console.log("\n=== BONUS Program 11: Hex Color Validator ===");
console.log(isValidHexColor("#ff5733"));
console.log(isValidHexColor("#fff"));
console.log(isValidHexColor("#12345"));
console.log(isValidHexColor("ff5733"));