function isAnagram(s, t) {
  return s.split("").sort().join("") === t.split("").sort().join("");
}

console.log(isAnagram("anagram", "nagaram"));
