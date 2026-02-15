function longestPalindromeTwoWords(words) {
  const count = {};
  
  for (let word of words) {
    count[word] = (count[word] || 0) + 1;
  }
  
  let length = 0;
  let hasMiddle = false;
  
  for (let word in count) {
    const reversed = word.split('').reverse().join('');
    
    if (word === reversed) {
      if (count[word] % 2 === 0) {
        length += count[word];
      } else {
        length += count[word] - 1;
        hasMiddle = true;
      }
    } else if (count[reversed] && word < reversed) {
      length += 2 * Math.min(count[word], count[reversed]);
    }
  }
  
  if (hasMiddle) length += 1;
  
  return {
    words: words.length,
    palindromeLength: length * 2,
    totalWords: length,
    algorithm: 'Palindrome from Two-Letter Words'
  };
}

console.log("\n=== Program 2: Longest Palindrome from Words ===");
console.log(longestPalindromeTwoWords(["lc","cl","gg"]));
console.log(longestPalindromeTwoWords(["ab","ty","yt","lc","cl","ab"]));