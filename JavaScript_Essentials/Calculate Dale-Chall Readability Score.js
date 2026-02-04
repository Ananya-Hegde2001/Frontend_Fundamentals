function daleChallScore(text) {
  const familiarWords = new Set([
    'a', 'about', 'all', 'an', 'and', 'are', 'as', 'at', 'be', 'been',
    'but', 'by', 'call', 'can', 'come', 'day', 'do', 'down', 'each', 'find',
    'first', 'for', 'from', 'get', 'give', 'go', 'had', 'has', 'have', 'he',
    'her', 'him', 'his', 'how', 'if', 'in', 'into', 'is', 'it', 'just',
    'know', 'like', 'long', 'look', 'made', 'make', 'man', 'many', 'may',
    'more', 'my', 'new', 'no', 'not', 'now', 'of', 'on', 'one', 'only',
    'or', 'other', 'our', 'out', 'over', 'people', 'said', 'say', 'see',
    'she', 'so', 'some', 'take', 'than', 'that', 'the', 'their', 'them',
    'then', 'there', 'these', 'they', 'this', 'time', 'to', 'two', 'up',
    'use', 'very', 'was', 'way', 'we', 'well', 'were', 'what', 'when',
    'which', 'who', 'will', 'with', 'word', 'work', 'would', 'write',
    'year', 'you', 'your'
  ]);
  
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  
  const difficultWords = words.filter(word => 
    !familiarWords.has(word) && word.length > 3
  ).length;
  
  const percentDifficult = words.length > 0 
    ? (difficultWords / words.length) * 100 
    : 0;
  
  const avgSentenceLength = sentences.length > 0 
    ? words.length / sentences.length 
    : 0;
  
  const rawScore = 0.1579 * percentDifficult + 0.0496 * avgSentenceLength;
  const adjustedScore = percentDifficult > 5 ? rawScore + 3.6365 : rawScore;
  
  const getGradeLevel = (score) => {
    if (score <= 4.9) return '4th grade or lower';
    if (score <= 5.9) return '5th-6th grade';
    if (score <= 6.9) return '7th-8th grade';
    if (score <= 7.9) return '9th-10th grade';
    if (score <= 8.9) return '11th-12th grade';
    if (score <= 9.9) return '13th-15th grade (College)';
    return 'College graduate';
  };
  
  return {
    score: adjustedScore.toFixed(2),
    gradeLevel: getGradeLevel(adjustedScore),
    difficultWords,
    totalWords: words.length,
    percentDifficult: percentDifficult.toFixed(2) + '%',
    avgSentenceLength: avgSentenceLength.toFixed(2)
  };
}

console.log("\n=== Program 2: Dale-Chall Readability ===");
console.log(daleChallScore("The cat sat on the mat."));