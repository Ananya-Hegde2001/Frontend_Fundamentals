function smartQuotes(text) {
  text = text.replace(/"([^"]*)"/g, '"$1"');
  
  text = text.replace(/(\w)'(\w)/g, '$1'$2');
  text = text.replace(/'([^']*)'/g, ''$1''); 
  
  text = text.replace(/\b"(\w)/g, '"$1');
  text = text.replace(/(\w)"\b/g, '$1"');
  
  return text;
}

console.log("\n=== Program 2: Smart Quote Converter ===");
console.log(smartQuotes(`He said "Hello" and that's all.`));
console.log(smartQuotes(`"Don't worry," she said.`));
console.log(smartQuotes(`It's a "beautiful" day.`));