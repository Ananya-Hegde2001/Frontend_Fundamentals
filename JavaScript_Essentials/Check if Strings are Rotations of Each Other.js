function areRotations(str1, str2) {
  if (str1.length !== str2.length) return false;
  return (str1 + str1).includes(str2);
}

console.log("=== Program 1: String Rotation Checker ===");
console.log(areRotations("waterbottle", "erbottlewat")); 
console.log(areRotations("amazon", "azonam")); 
console.log(areRotations("hello", "llohe")); 
console.log(areRotations("hello", "world")); 