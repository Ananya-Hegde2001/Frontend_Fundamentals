let arr = [2, 3, 4, 2, 3, 2, 5];
let count = {};
let maxFreq = 0, mostFreq;

for (let num of arr) {
  count[num] = (count[num] || 0) + 1;
  if (count[num] > maxFreq) {
    maxFreq = count[num];
    mostFreq = num;
  }
}

console.log("Most frequent:", mostFreq);
