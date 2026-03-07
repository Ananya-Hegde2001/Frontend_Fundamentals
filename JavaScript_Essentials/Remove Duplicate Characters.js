function removeDuplicates(str) {
  return [...new Set(str.split(''))].join('');
}

console.log(removeDuplicates("programming")); 
console.log(removeDuplicates("aabbccdd"));   
console.log(removeDuplicates("hello"));      