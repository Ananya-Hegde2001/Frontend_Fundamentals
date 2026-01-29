function processContractions(text) {
  const contractionMap = {
    "won't": "will not", "can't": "cannot", "n't": " not",
    "'ll": " will", "'ve": " have", "'re": " are",
    "'m": " am", "'d": " would", "'s": " is",
    "shouldn't": "should not", "wouldn't": "would not",
    "couldn't": "could not", "mightn't": "might not",
    "mustn't": "must not", "needn't": "need not"
  };
  
  const found = [];
  let expanded = text;
  
  for (let [contraction, expansion] of Object.entries(contractionMap)) {
    const regex = new RegExp(contraction, 'gi');
    const matches = text.match(regex);
    
    if (matches) {
      found.push(...matches.map(m => ({
        contraction: m,
        expansion: expansion,
        position: text.indexOf(m)
      })));
      
      expanded = expanded.replace(regex, expansion);
    }
  }
  
  return {
    original: text,
    expanded,
    contractions: found,
    count: found.length,
    hasContractions: found.length > 0
  };
}

console.log("\n=== Program 3: Contraction Processing ===");
console.log(processContractions("I can't believe you won't come"));
console.log(processContractions("She's happy and they're ready"));