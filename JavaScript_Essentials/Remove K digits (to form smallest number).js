const removeKdigits = (num, k) => {
  let stack = [];

  for (let n of num) {
    while (k > 0 && stack.length && stack.at(-1) > n) {
      stack.pop(); k--;
    }
    stack.push(n);
  }

  while (k-- > 0) stack.pop();

  return stack.join("").replace(/^0+/, "") || "0";
};
