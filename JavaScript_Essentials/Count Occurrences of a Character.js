function countOccurrences(str, char) {
  return str.split(char).length - 1;
}

console.log(countOccurrences("banana", "a")); 
console.log(countOccurrences("hello world", "l")); 