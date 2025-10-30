let arr = ["apple", "banana", "apple", "orange", "banana", "apple"];
let count = {};

for (let item of arr) {
  count[item] = (count[item] || 0) + 1;
}

console.log(count);

