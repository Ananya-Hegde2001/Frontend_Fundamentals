function generateRandomString(length) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return result;
}

console.log("\n=== BONUS Program 7: Generate Random String ===");
console.log(generateRandomString(10)); 
console.log(generateRandomString(5)); 
console.log(generateRandomString(8));