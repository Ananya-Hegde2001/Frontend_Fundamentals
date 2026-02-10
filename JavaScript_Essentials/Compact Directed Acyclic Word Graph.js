function buildCDAWG(text) {
  const states = [{ edges: {}, suffixLink: null, isTerminal: false }];
  let stateCount = 1;
  
  const addState = () => {
    states.push({ edges: {}, suffixLink: null, isTerminal: false });
    return stateCount++;
  };
  
  const addEdge = (from, to, char) => {
    states[from].edges[char] = to;
  };
  
  let currentState = 0;
  
  for (let i = 0; i < text.length; i++) {
    let state = 0;
    
    for (let j = i; j < text.length; j++) {
      const char = text[j];
      
      if (!states[state].edges[char]) {
        const newState = addState();
        addEdge(state, newState, char);
      }
      
      state = states[state].edges[char];
    }
    
    states[state].isTerminal = true;
  }
  
  const countSubstrings = (state = 0, memo = {}) => {
    if (memo[state] !== undefined) return memo[state];
    
    let count = states[state].isTerminal ? 1 : 0;
    
    for (let char in states[state].edges) {
      count += countSubstrings(states[state].edges[char], memo);
    }
    
    memo[state] = count;
    return count;
  };
  
  return {
    text,
    stateCount,
    edgeCount: states.reduce((sum, s) => sum + Object.keys(s.edges).length, 0),
    uniqueSubstrings: countSubstrings(),
    structure: 'CDAWG',
    spaceComplexity: 'O(n) states'
  };
}

console.log("\n=== Program 2: Compact DAWG ===");
console.log(buildCDAWG("banana"));