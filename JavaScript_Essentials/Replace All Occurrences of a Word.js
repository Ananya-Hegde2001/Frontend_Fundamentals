function replaceAll(str, find, replace) {
  return str.split(find).join(replace);
}

console.log(replaceAll("I love cats. Cats are great!", "cats", "dogs"));

console.log(replaceAll("banana", "a", "@"));