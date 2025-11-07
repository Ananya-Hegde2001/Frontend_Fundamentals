function isBalanced(str) {
  let stack = [];
  const map = { ')':'(', '}':'{', ']':'[' };

  for (let ch of str) {
    if (['(', '{', '['].includes(ch)) stack.push(ch);
    else if (map[ch]) {
      if (stack.pop() !== map[ch]) return false;
    }
  }

  return stack.length === 0;
}

console.log(isBalanced("({[]})"));
