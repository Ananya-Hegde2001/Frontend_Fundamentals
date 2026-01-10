function isValidIPv4(ip) {
  const parts = ip.split('.');
  
  if (parts.length !== 4) return false;
  
  return parts.every(part => {
    const num = parseInt(part, 10);
    return num >= 0 && num <= 255 && part === String(num);
  });
}

console.log("\n=== BONUS Program 11: IPv4 Validator ===");
console.log(isValidIPv4("192.168.1.1"));
console.log(isValidIPv4("255.255.255.255"));
console.log(isValidIPv4("256.1.1.1"));
console.log(isValidIPv4("192.168.1"));