function countFrequency(arr) {
  let freq = {};
  for (let x of arr) freq[x] = (freq[x] || 0) + 1;
  return freq;
}

console.log(countFrequency(["a", "b", "a", "c", "b"]));
