function containsEmoji(str) {
  const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
  return emojiRegex.test(str);
}

console.log("\n=== BONUS Program 8: Contains Emoji ===");
console.log(containsEmoji("Hello 😊")); 
console.log(containsEmoji("Hello World"));
console.log(containsEmoji("🚀 Launch!"));