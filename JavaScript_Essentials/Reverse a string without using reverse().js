function reverseString(str) {
  let res = "";
  for (let ch of str) res = ch + res;
  return res;
}

console.log(reverseString("startup"));
