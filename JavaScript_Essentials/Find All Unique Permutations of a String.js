function getPermutations(str) {
  if (str.length <= 1) return [str];
  let result = [];

  for (let i = 0; i < str.length; i++) {
    let char = str[i];
    let rest = str.slice(0, i) + str.slice(i + 1);
    for (let perm of getPermutations(rest)) {
      result.push(char + perm);
    }
  }
  return [...new Set(result)];
}

console.log(getPermutations("abc"));
