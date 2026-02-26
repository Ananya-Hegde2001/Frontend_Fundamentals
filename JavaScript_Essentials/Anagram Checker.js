function isAnagram(str1, str2) {
  const sort = str => str.toLowerCase().replace(/[^a-z]/g, '').split('').sort().join('');
  return sort(str1) === sort(str2);
}

console.log(isAnagram("listen", "silent")); 
console.log(isAnagram("hello", "world"));   
console.log(isAnagram("Astronomer", "Moon starer")); 