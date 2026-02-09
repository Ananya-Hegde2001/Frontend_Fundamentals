function stringKernel(s1, s2, lambda = 0.5, n = 2) {
  const cache = {};
  
  const K = (i, j, l) => {
    const key = `${i},${j},${l}`;
    if (cache[key] !== undefined) return cache[key];
    
    if (l === 0) return 1;
    if (i === s1.length || j === s2.length) return 0;
    
    let sum = 0;
    for (let k = j; k < s2.length; k++) {
      if (s1[i] === s2[k]) {
        sum += K(i + 1, k + 1, l - 1) * Math.pow(lambda, k - j + 2);
      }
    }
    
    sum += K(i + 1, j, l);
    cache[key] = sum;
    return sum;
  };
  
  const kernel = K(0, 0, n);
  
  return {
    s1,
    s2,
    kernel: kernel.toFixed(4),
    n,
    lambda,
    algorithm: 'String Subsequence Kernel',
    useCase: 'Machine Learning feature extraction'
  };
}

console.log("\n=== BONUS Program 10: String Kernel ===");
console.log(stringKernel("cat", "car"));