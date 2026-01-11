function rgbToHex(r, g, b) {
  const toHex = (n) => {
    const hex = Math.max(0, Math.min(255, n)).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  
  return '#' + toHex(r) + toHex(g) + toHex(b);
}

console.log("\n=== BONUS Program 6: RGB to Hex ===");
console.log(rgbToHex(255, 87, 51)); 
console.log(rgbToHex(0, 255, 0));
console.log(rgbToHex(255, 255, 255));