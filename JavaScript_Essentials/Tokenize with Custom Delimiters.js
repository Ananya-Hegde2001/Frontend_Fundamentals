function tokenize(text, delimiters = [' ', ',', '.', ';', ':', '\n', '\t']) {
  let tokens = [text];
  
  for (let delimiter of delimiters) {
    const newTokens = [];
    for (let token of tokens) {
      newTokens.push(...token.split(delimiter));
    }
    tokens = newTokens;
  }
  
  tokens = tokens.filter(t => t.trim().length > 0);
  
  return {
    tokens,
    count: tokens.length,
    delimiters: delimiters,
    averageLength: tokens.length > 0 
      ? (tokens.reduce((sum, t) => sum + t.length, 0) / tokens.length).toFixed(2)
      : 0
  };
}

console.log("\n=== Program 2: Advanced Tokenization ===");
console.log(tokenize("Hello, world! How are you?", [' ', ',', '!', '?']));
console.log(tokenize("apple;banana,cherry:date", [';', ',', ':']));