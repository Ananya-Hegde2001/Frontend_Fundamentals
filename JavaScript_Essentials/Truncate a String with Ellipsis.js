function truncate(str, maxLength) {
  return str.length > maxLength ? str.slice(0, maxLength) + '...' : str;
}

console.log(truncate("JavaScript is awesome!", 10)); 
console.log(truncate("Hi", 10));                     