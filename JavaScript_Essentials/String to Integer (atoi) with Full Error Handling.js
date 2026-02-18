unction robustAtoi(s) {
  const INT_MAX = 2147483647;
  const INT_MIN = -2147483648;
  
  let i = 0;
  const n = s.length;
  
  while (i < n && s[i] === ' ') i++;
  
  if (i === n) {
    return { value: 0, error: 'Empty string', valid: false };
  }
  
  let sign = 1;
  if (s[i] === '+' || s[i] === '-') {
    sign = s[i] === '-' ? -1 : 1;
    i++;
  }
  
  let result = 0;
  const startPos = i;
  
  while (i < n && s[i] >= '0' && s[i] <= '9') {
    const digit = s[i].charCodeAt(0) - '0'.charCodeAt(0);
    
    if (result > Math.floor(INT_MAX / 10) || 
        (result === Math.floor(INT_MAX / 10) && digit > 7)) {
      return {
        value: sign === 1 ? INT_MAX : INT_MIN,
        error: 'Overflow',
        valid: false,
        overflow: true
      };
    }
    
    result = result * 10 + digit;
    i++;
  }
  
  if (i === startPos) {
    return { value: 0, error: 'No digits found', valid: false };
  }
  
  return {
    value: result * sign,
    valid: true,
    digitsRead: i - startPos,
    sign: sign === 1 ? '+' : '-',
    remainingString: s.substring(i)
  };
}

console.log("\n=== Program 2: Robust String to Integer ===");
console.log(robustAtoi("   -42"));
console.log(robustAtoi("4193 with words"));
console.log(robustAtoi("91283472332"));
console.log(robustAtoi("words and 987"));