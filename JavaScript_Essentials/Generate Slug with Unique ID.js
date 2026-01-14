function generateSlugWithId(title) {
  const slug = title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
  
  const uniqueId = Math.random().toString(36).substring(2, 8);
  return `${slug}-${uniqueId}`;
}

console.log("\n=== BONUS Program 7: Slug with Unique ID ===");
console.log(generateSlugWithId("My Awesome Article"));
console.log(generateSlugWithId("Hello World!"));