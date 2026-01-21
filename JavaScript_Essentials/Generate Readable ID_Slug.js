function generateReadableId(prefix = 'id', length = 8) {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let id = prefix + '-';
  
  for (let i = 0; i < length; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  
  return id;
}

console.log("\n=== BONUS Program 4: Readable ID Generator ===");
console.log(generateReadableId('user'));
console.log(generateReadableId('order', 12));
console.log(generateReadableId('post'));