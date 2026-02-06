function buildSuffixTree(text) {
  text = text + '$'; 
  const tree = { children: {}, isLeaf: false };
  
  for (let i = 0; i < text.length; i++) {
    let current = tree;
    
    for (let j = i; j < text.length; j++) {
      const char = text[j];
      
      if (!current.children[char]) {
        current.children[char] = {
          children: {},
          isLeaf: j === text.length - 1,
          suffixIndex: i
        };
      }
      
      current = current.children[char];
    }
  }
  
  const countNodes = (node) => {
    let count = 1;
    for (let child in node.children) {
      count += countNodes(node.children[child]);
    }
    return count;
  };
  
  const findRepeats = (node, path = '', repeats = []) => {
    let childCount = Object.keys(node.children).length;
    
    if (childCount > 1 && path.length > 1) {
      repeats.push(path);
    }
    
    for (let char in node.children) {
      if (char !== '$') {
        findRepeats(node.children[char], path + char, repeats);
      }
    }
    
    return repeats;
  };
  
  return {
    text: text.slice(0, -1),
    nodeCount: countNodes(tree),
    suffixCount: text.length,
    repeatedSubstrings: findRepeats(tree).slice(0, 10),
    treeDepth: text.length,
    structure: 'Suffix Tree'
  };
}

console.log("=== Program 1: Suffix Tree Construction ===");
console.log(buildSuffixTree("banana"));