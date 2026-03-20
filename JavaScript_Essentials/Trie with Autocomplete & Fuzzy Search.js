class TrieNode {
  constructor() {
    this.children = {};
    this.isEnd = false;
    this.frequency = 0;
  }
}

class Trie {
  constructor() { this.root = new TrieNode(); }

  insert(word) {
    let node = this.root;
    for (const ch of word) {
      if (!node.children[ch]) node.children[ch] = new TrieNode();
      node = node.children[ch];
    }
    node.isEnd = true;
    node.frequency++;
  }

  autocomplete(prefix, topN = 5) {
    let node = this.root;
    for (const ch of prefix) {
      if (!node.children[ch]) return [];
      node = node.children[ch];
    }
    const results = [];
    const dfs = (curr, word) => {
      if (curr.isEnd) results.push({ word, freq: curr.frequency });
      for (const [ch, child] of Object.entries(curr.children))
        dfs(child, word + ch);
    };
    dfs(node, prefix);
    return results.sort((a, b) => b.freq - a.freq).slice(0, topN).map(r => r.word);
  }

  fuzzySearch(target, maxDist = 1) {
    const results = [];
    const dfs = (node, word, i, dist) => {
      if (dist > maxDist) return;
      if (node.isEnd && Math.abs(word.length - target.length) <= maxDist)
        results.push(word);
      for (const [ch, child] of Object.entries(node.children)) {
        const newDist = dist + (i >= target.length ? 1 : ch !== target[i] ? 1 : 0);
        dfs(child, word + ch, i + 1, newDist);
      }
    };
    dfs(this.root, "", 0, 0);
    return [...new Set(results)];
  }

  delete(word) {
    const dfs = (node, i) => {
      if (i === word.length) {
        if (!node.isEnd) return false;
        node.isEnd = false;
        return Object.keys(node.children).length === 0;
      }
      const ch = word[i];
      if (!node.children[ch]) return false;
      if (dfs(node.children[ch], i + 1))
        delete node.children[ch];
      return !node.isEnd && Object.keys(node.children).length === 0;
    };
    dfs(this.root, 0);
  }
}

const trie = new Trie();
const words = ["apple","app","application","apply","apt","apt","banana","band","bandana"];
words.forEach(w => trie.insert(w));

console.log("Autocomplete 'app':", trie.autocomplete("app"));

console.log("Fuzzy 'aple':", trie.fuzzySearch("aple", 1));

trie.delete("apple");
console.log("After delete, 'app':", trie.autocomplete("app"));