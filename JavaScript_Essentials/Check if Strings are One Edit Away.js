function oneEditAway(str1, str2) {
  const lenDiff = Math.abs(str1.length - str2.length);
  if (lenDiff > 1) return false;
  
  let i = 0, j = 0, edits = 0;
  
  while (i < str1.length && j < str2.length) {
    if (str1[i] !== str2[j]) {
      edits++;
      if (edits > 1) return false;
      
      if (str1.length > str2.length) {
        i++;
      } else if (str2.length > str1.length) {
        j++;
      } else {
        i++;
        j++;
      }
    } else {
      i++;
      j++;
    }
  }
  
  return true;
}

console.log("\n=== BONUS Program 10: One Edit Away ===");
console.log(oneEditAway("cat", "cats"));
console.log(oneEditAway("cat", "cut"));
console.log(oneEditAway("cat", "at"));
console.log(oneEditAway("cat", "dog"));