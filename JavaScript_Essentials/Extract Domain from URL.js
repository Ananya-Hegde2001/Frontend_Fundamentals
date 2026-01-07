function extractDomain(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch {
    // Fallback for simple parsing
    const match = url.match(/^(?:https?:\/\/)?(?:www\.)?([^\/]+)/i);
    return match ? match[1] : '';
  }
}

console.log("\n=== BONUS Program 10: Extract Domain ===");
console.log(extractDomain("https://www.example.com/path")); // www.example.com
console.log(extractDomain("http://github.com/user/repo")); // github.com
console.log(extractDomain("www.google.com"));