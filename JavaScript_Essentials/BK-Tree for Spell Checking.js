function buildBKTree(words) {
  const levenshtein = (s1, s2) => {
    const matrix = Array.from({ length: s2.length + 1 }, () => Array(s1.length + 1).fill(0));
    
    for (let i = 0; i <= s1.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= s2.length; j++) matrix[j][0] = j;
    
    for (let j = 1; j <= s2.length; j++) {
      for (let i = 1; i <= s1.length; i++) {
        if (s1[i - 1] === s2[j - 1]) {
          matrix[j][i] = matrix[j - 1][i - 1];
        } else {
          matrix[j][i] = Math.min(
            matrix[j - 1][i - 1] + 1,
            matrix[j][i - 1] + 1,
            matrix[j - 1][i] + 1
          );
        }
      }
    }
    
    return matrix[s2.length][s1.length];
  };
  
  class BKNode {
    constructor(word) {
      this.word = word;
      this.children = {};
    }
    
    add(word) {
      const dist = levenshtein(this.word, word);
      
      if (dist === 0) return;
      
      if (this.children[dist]) {
        this.children[dist].add(word);
      } else {
        this.children[dist] = new BKNode(word);
      }
    }
    
    search(word, maxDist, results = []) {
      const dist = levenshtein(this.word, word);
      
      if (dist <= maxDist) {
        results.push({ word: this.word, distance: dist });
      }
      
      for (let d = Math.max(1, dist - maxDist); d <= dist + maxDist; d++) {
        if (this.children[d]) {
          this.children[d].search(word, maxDist, results);
        }
      }
      
      return results;
    }
  }
  
  if (words.length === 0) return null;
  
  const root = new BKNode(words[0]);
  for (let i = 1; i < words.length; i++) {
    root.add(words[i]);
  }
  
  return {
    root,
    search: (word, maxDist = 2) => {
      return root.search(word, maxDist).sort((a, b) => a.distance - b.distance);
    },
    wordCount: words.length,
    structure: 'BK-Tree'
  };
}

console.log("=== Program 1: BK-Tree Spell Checker ===");
const dictionary = buildBKTree(["hello", "help", "shell", "world", "word", "work"]);
console.log(dictionary.search("helo", 1));