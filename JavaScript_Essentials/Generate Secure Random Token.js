function generateSecureToken(length = 32) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    token += chars[randomIndex];
  }
  
  return token;
}

console.log("=== Program 1: Secure Random Token ===");
console.log(generateSecureToken(16));
console.log(generateSecureToken(32));
console.log(generateSecureToken(8));