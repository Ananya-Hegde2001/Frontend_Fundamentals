function alternateWords(str) {
  return str.split(' ')
            .map((word, index) => {
              return index % 2 === 0 ? word.toUpperCase() : word.toLowerCase();
            })
            .join(' ');
}

console.log("=== Program 1: Alternate Words Case ===");
console.log(alternateWords("hello world javascript"));
console.log(alternateWords("the quick brown fox"));
console.log(alternateWords("one two three four"));