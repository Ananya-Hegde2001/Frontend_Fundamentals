function isValidURL(str) {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}

console.log("\n=== BONUS Program 9: URL Validator ===");
console.log(isValidURL("https://example.com")); 
console.log(isValidURL("http://localhost:3000/path")); 
console.log(isValidURL("not a url"));
console.log(isValidURL("ftp://files.server.com"));