function hexToRgb(hex) {
  hex = hex.replace('#', '');
  
  if (hex.length === 3) {
    hex = hex.split('').map(c => c + c).join('');
  }
  
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  return { r, g, b, string: `rgb(${r}, ${g}, ${b})` };
}

console.log("\n=== BONUS Program 5: Hex to RGB ===");
console.log(hexToRgb("#ff5733"));
console.log(hexToRgb("#fff"));
console.log(hexToRgb("00ff00"));