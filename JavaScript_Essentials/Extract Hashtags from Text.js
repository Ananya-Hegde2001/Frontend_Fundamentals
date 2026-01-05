function extractHashtags(text) {
  const regex = /#[\w]+/g;
  const matches = text.match(regex);
  return matches || [];
}

console.log("\n=== BONUS Program 11: Extract Hashtags ===");
console.log(extractHashtags("Love #JavaScript and #coding!")); 
console.log(extractHashtags("#webdev #programming #100DaysOfCode"));
console.log(extractHashtags("No hashtags here"));