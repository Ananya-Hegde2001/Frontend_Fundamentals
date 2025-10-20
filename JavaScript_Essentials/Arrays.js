const nums = [1, 2, 3, 4, 5];

const squares = nums.map(n => n * n);

const evens = nums.filter(n => n % 2 === 0);

const sum = nums.reduce((acc, cur) => acc + cur, 0);

console.log({ nums, squares, evens, sum });
