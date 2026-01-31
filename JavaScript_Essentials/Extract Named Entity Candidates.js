function extractNamedEntityCandidates(text) {
  const capitalized = text.match(/\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*/g) || [];
  
  const quoted = text.match(/"([^"]+)"/g) || [];
  
  const mentions = text.match(/@\w+/g) || [];
  
  const hashtags = text.match(/#\w+/g) || [];
  
  const dates = text.match(/\b\d{1,2}\/\d{1,2}\/\d{2,4}\b|\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{1,2},?\s+\d{4}\b/gi) || [];
  
  return {
    properNouns: capitalized,
    quotedText: quoted.map(q => q.replace(/"/g, '')),
    mentions,
    hashtags,
    dates,
    totalEntities: capitalized.length + quoted.length + mentions.length + hashtags.length + dates.length
  };
}

console.log("\n=== BONUS Program 6: Named Entity Candidates ===");
console.log(extractNamedEntityCandidates("John Smith visited New York on January 15, 2024"));