function replaceAll(str, find, replace) {
  return str.split(find).join(replace);
}

console.log("\n=== Program 2: Replace All Occurrences ===");
console.log(replaceAll("hello world hello", "hello", "hi"));
console.log(replaceAll("aaa bbb aaa", "aaa", "xxx"));
console.log(replaceAll("test-test-test", "-", "_"));