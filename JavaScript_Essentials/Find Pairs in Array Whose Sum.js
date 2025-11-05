function findPairs(arr, target) {
  let seen = new Set();
  let pairs = [];
  for (let num of arr) {
    let complement = target - num;
    if (seen.has(complement)) pairs.push([num, complement]);
    seen.add(num);
  }
  return pairs;
}

console.log(findPairs([2, 4, 3, 7, 1, 5], 6));
