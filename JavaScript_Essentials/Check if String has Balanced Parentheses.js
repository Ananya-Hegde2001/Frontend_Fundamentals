function hasBalancedParentheses(str) {
  const stack = [];
  const pairs = { '(': ')', '[': ']', '{': '}' };
  
  for (let char of str) {
    if (pairs[char]) {
      stack.push(char);
    } else if (Object.values(pairs).includes(char)) {
      if (stack.length === 0 || pairs[stack.pop()] !== char) {
        return false;
      }
    }
  }
  
  return stack.length === 0;
}

console.log("\n=== Program 16: Balanced Parentheses Checker ===");
console.log(hasBalancedParentheses("()[]{}"));     
console.log(hasBalancedParentheses("({[]})"));     
console.log(hasBalancedParentheses("([)]"));      
console.log(hasBalancedParentheses("{[}]"));      