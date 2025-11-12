function isBalanced(str) {
  let stack = [];
  for (let ch of str) {
    if (ch === "(") stack.push(ch);
    else if (ch === ")") {
      if (stack.length === 0) return false;
      stack.pop();
    }
  }
  return stack.length === 0;
}

console.log(isBalanced("(a+b)*(c+d)")); 
console.log(isBalanced("(a+b))"));    
