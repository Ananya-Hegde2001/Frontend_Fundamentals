function extractDates(text) {
  const patterns = [
    /\b(\d{1,2})\/(\d{1,2})\/(\d{4})\b/g,
    /\b(\d{4})-(\d{2})-(\d{2})\b/g,
    /\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{1,2}),?\s+(\d{4})\b/gi
  ];
  
  const dates = [];
  
  for (let pattern of patterns) {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      dates.push(match[0]);
    }
  }
  
  return [...new Set(dates)]; 
}

console.log("\n=== Program 3: Extract Dates ===");
console.log(extractDates("Meeting on 12/25/2024 and 2024-01-15"));
console.log(extractDates("Event: January 15, 2024 or March 3, 2024"));