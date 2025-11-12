let arr = [1, 2, 3, 4, 4, 6];
let n = 6;
let missing = [];
let duplicate = [];

for (let i = 1; i <= n; i++) {
  if (arr.indexOf(i) === -1) missing.push(i);
  if (arr.indexOf(i) !== arr.lastIndexOf(i)) duplicate.push(i);
}

console.log("Missing:", missing);
console.log("Duplicate:", [...new Set(duplicate)]);
