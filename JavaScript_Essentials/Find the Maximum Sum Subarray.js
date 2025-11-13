let arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
let maxSum = arr[0], current = arr[0];

for (let i = 1; i < arr.length; i++) {
  current = Math.max(arr[i], current + arr[i]);
  maxSum = Math.max(maxSum, current);
}

console.log("Max Subarray Sum:", maxSum);
