function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
}

console.log("\n=== Program 2: Format Bytes ===");
console.log(formatBytes(1024)); 
console.log(formatBytes(1048576));
console.log(formatBytes(1234567890));
console.log(formatBytes(512));