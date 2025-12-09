function charFrequency(str) {
  let map = {};

  for (let ch of str) {
    map[ch] = (map[ch] || 0) + 1;
  }

  return map;
}

console.log(charFrequency("banana"));
