const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question("Enter numbers separated by space: ", (input) => {
  const arr = input.split(" ").map(Number);
  const sum = arr.reduce((acc, val) => acc + val, 0);
  console.log("Sum of array elements:", sum);
  readline.close();
});
