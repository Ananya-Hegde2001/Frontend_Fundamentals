function slugifyWithTranslit(text) {
  const translitMap = {
    'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u',
    'à': 'a', 'è': 'e', 'ì': 'i', 'ò': 'o', 'ù': 'u',
    'ä': 'a', 'ë': 'e', 'ï': 'i', 'ö': 'o', 'ü': 'u',
    'ñ': 'n', 'ç': 'c', 'ß': 'ss'
  };
  
  let slug = text.toLowerCase();
  
  for (let [char, replacement] of Object.entries(translitMap)) {
    slug = slug.replace(new RegExp(char, 'g'), replacement);
  }
  
  slug = slug
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  
  return slug;
}

console.log("\n=== BONUS Program 7: Slugify with Transliteration ===");
console.log(slugifyWithTranslit("Café Müller"));
console.log(slugifyWithTranslit("Niño José"));
console.log(slugifyWithTranslit("Zürich über"));