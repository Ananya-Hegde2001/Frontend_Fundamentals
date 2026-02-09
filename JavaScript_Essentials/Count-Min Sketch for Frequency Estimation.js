function createCountMinSketch(width = 100, depth = 5) {
  const table = Array.from({ length: depth }, () => Array(width).fill(0));
  
  const hash = (str, seed) => {
    let h = seed;
    for (let char of str) {
      h = (h * 31 + char.charCodeAt(0)) & 0x7fffffff;
    }
    return h % width;
  };
  
  const add = (item, count = 1) => {
    for (let i = 0; i < depth; i++) {
      const index = hash(item, i);
      table[i][index] += count;
    }
  };
  
  const estimate = (item) => {
    let min = Infinity;
    for (let i = 0; i < depth; i++) {
      const index = hash(item, i);
      min = Math.min(min, table[i][index]);
    }
    return min;
  };
  
  return {
    add,
    estimate,
    width,
    depth,
    structure: 'Count-Min Sketch'
  };
}

console.log("\n=== BONUS Program 8: Count-Min Sketch ===");
const cms = createCountMinSketch(50, 3);
cms.add("hello", 5);
cms.add("world", 3);
console.log({
  estimateHello: cms.estimate("hello"),
  estimateWorld: cms.estimate("world"),
  estimateUnknown: cms.estimate("unknown")
});