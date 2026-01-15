function extractMentions(text) {
  const regex = /@(\w+)/g;
  const matches = text.match(regex);
  return matches ? matches.map(m => m.slice(1)) : [];
}

console.log("\n=== BONUS Program 10: Extract Mentions ===");
console.log(extractMentions("Hey @john and @jane, check this out!")); 
console.log(extractMentions("@user123 posted @user456")); 
console.log(extractMentions("No mentions here")); 