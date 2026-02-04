function burrowsWheelerTransform(text) {
  if (!text) return { transformed: '', index: 0 };
  
  const marked = text + '|';
  const rotations = [];
  
  for (let i = 0; i < marked.length; i++) {
    rotations.push(marked.slice(i) + marked.slice(0, i));
  }
  
  rotations.sort();
  
  const transformed = rotations.map(r => r[r.length - 1]).join('');
  const index = rotations.indexOf(marked);
  
  return {
    original: text,
    transformed,
    primaryIndex: index,
    rotationsCount: rotations.length,
    sortedRotations: rotations.slice(0, 5) 
  };
}

console.log("=== Program 1: Burrows-Wheeler Transform ===");
console.log(burrowsWheelerTransform("banana"));