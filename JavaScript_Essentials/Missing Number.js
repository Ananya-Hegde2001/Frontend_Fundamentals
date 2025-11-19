function missingNumber(nums) {
  let total = (nums.length * (nums.length + 1)) / 2;
  let sum = nums.reduce((a, b) => a + b, 0);
  return total - sum;
}

console.log(missingNumber([3,0,1]));
