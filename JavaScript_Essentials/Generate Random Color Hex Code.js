function generateRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  
  return color;
}

console.log("\n=== Program 2: Random Color Generator ===");
console.log(generateRandomColor());
console.log(generateRandomColor());
console.log(generateRandomColor());