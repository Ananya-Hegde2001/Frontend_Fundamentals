function extractURLs(text) {
  const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
  return text.match(urlRegex) || [];
}

console.log("\n=== BONUS Program 7: Extract URLs ===");
console.log(extractURLs("Check out https://example.com and http://test.org"));
console.log(extractURLs("Visit https://github.com/user/repo for code"));