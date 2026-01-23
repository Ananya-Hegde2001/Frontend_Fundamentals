function analyzeSentiment(text) {
  const positiveWords = [
    'good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic', 
    'love', 'happy', 'joy', 'beautiful', 'best', 'awesome', 'perfect',
    'brilliant', 'outstanding', 'superb', 'delightful', 'pleased'
  ];
  
  const negativeWords = [
    'bad', 'terrible', 'awful', 'horrible', 'worst', 'hate', 'angry',
    'sad', 'disappointing', 'poor', 'useless', 'fail', 'boring',
    'disgusting', 'annoying', 'frustrating', 'pathetic', 'nasty'
  ];
  
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  
  let positiveCount = 0;
  let negativeCount = 0;
  
  for (let word of words) {
    if (positiveWords.includes(word)) positiveCount++;
    if (negativeWords.includes(word)) negativeCount++;
  }
  
  const score = positiveCount - negativeCount;
  let sentiment = 'neutral';
  
  if (score > 0) sentiment = 'positive';
  else if (score < 0) sentiment = 'negative';
  
  return {
    sentiment,
    score,
    positive: positiveCount,
    negative: negativeCount,
    confidence: Math.abs(score) / words.length
  };
}

console.log("\n=== Program 3: Sentiment Analysis ===");
console.log(analyzeSentiment("This is a great product! I love it!"));
console.log(analyzeSentiment("Terrible service. Very disappointing."));
console.log(analyzeSentiment("The weather is okay today."));