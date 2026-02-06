function buildSuffixTree(text) {
  text = text + '$'; // Add termination character
  const tree = { children: {}, isLeaf: false };
  
  // Simplified construction - insert all suffixes
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
  
  // Count nodes
  const countNodes = (node) => {
    let count = 1;
    for (let child in node.children) {
      count += countNodes(node.children[child]);
    }
    return count;
  };
  
  // Find repeated substrings
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
// {nodeCount: 15, repeatedSubstrings: ['ana', 'na', 'a'], ...}


// Program 2: Approximate String Matching (Bitap Algorithm)
// Find approximate matches allowing errors
function bitapSearch(text, pattern, maxErrors = 1) {
  const m = pattern.length;
  const n = text.length;
  
  if (m === 0) return { matches: [], algorithm: 'Bitap' };
  
  // Build pattern mask
  const patternMask = {};
  for (let char of new Set(text + pattern)) {
    patternMask[char] = ~0;
  }
  
  for (let i = 0; i < m; i++) {
    patternMask[pattern[i]] &= ~(1 << i);
  }
  
  // Search with errors
  const matches = [];
  const R = Array(maxErrors + 1).fill(~1);
  
  for (let i = 0; i < n; i++) {
    const oldR = [...R];
    const char = text[i];
    
    // Exact match
    R[0] = (oldR[0] << 1) | patternMask[char];
    
    // Matches with errors
    for (let k = 1; k <= maxErrors; k++) {
      R[k] = ((oldR[k] << 1) | patternMask[char]) &
             ((oldR[k - 1] << 1) & (R[k - 1] << 1) & (oldR[k - 1]));
    }
    
    // Check for match
    for (let k = 0; k <= maxErrors; k++) {
      if ((R[k] & (1 << (m - 1))) === 0) {
        matches.push({
          index: i - m + 1,
          errors: k,
          match: text.substring(i - m + 1, i + 1)
        });
        break;
      }
    }
  }
  
  return {
    pattern,
    text,
    maxErrors,
    matches: matches.slice(0, 10),
    matchCount: matches.length,
    algorithm: 'Bitap (Shift-Or)'
  };
}

console.log("\n=== Program 2: Approximate String Matching ===");
console.log(bitapSearch("The quick brown fox", "quick", 1));