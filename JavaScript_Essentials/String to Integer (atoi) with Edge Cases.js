function myAtoi(str) {
  const INT_MAX = 2147483647;
  const INT_MIN = -2147483648;
  
  let i = 0;
  const n = str.length;
  let sign = 1;
  let result = 0;
  
  while (i < n && str[i] === ' ') {
    i++;
  }
  
  if (i < n && (str[i] === '+' || str[i] === '-')) {
    sign = str[i] === '-' ? -1 : 1;
    i++;
  }
  
  while (i < n && str[i] >= '0' && str[i] <= '9') {
    const digit = str[i].charCodeAt(0) - '0'.charCodeAt(0);
    
    if (result > Math.floor(INT_MAX / 10) || 
        (result === Math.floor(INT_MAX / 10) && digit > 7)) {
      return sign === 1 ? INT_MAX : INT_MIN;
    }
    
    result = result * 10 + digit;
    i++;
  }
  
  return result * sign;
}

console.log("\n=== BONUS Program 6: String to Integer (atoi) ===");
console.log(myAtoi("42")); 
console.log(myAtoi("   -42")); 
console.log(myAtoi("4193 with words")); 
console.log(myAtoi("words and 987")); 
console.log(myAtoi("-91283472332"));