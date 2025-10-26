function decimalToBinary(num) {
  const stack = [];
  let binary = "";

  while (num > 0) {
    stack.push(num % 2);
    num = Math.floor(num / 2);
  }

  while (stack.length > 0) {
    binary += stack.pop();
  }

  return binary;
}

console.log(decimalToBinary(10)); 
