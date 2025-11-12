let nums = [1, 4, 7, 2, 9, 5];
let target = 9;
let found = false;

for (let i = 0; i < nums.length; i++) {
  for (let j = i + 1; j < nums.length; j++) {
    if (nums[i] + nums[j] === target) {
      console.log(`Pair: (${nums[i]}, ${nums[j]})`);
      found = true;
    }
  }
}
if (!found) console.log("No pairs found");
