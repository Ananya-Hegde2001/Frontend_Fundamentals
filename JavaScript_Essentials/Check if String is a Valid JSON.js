function isValidJSON(str) {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
}

console.log("=== Program 1: JSON Validator ===");
console.log(isValidJSON('{"name":"John","age":30}'));
console.log(isValidJSON('[1,2,3]'));
console.log(isValidJSON('{"invalid":}'));
console.log(isValidJSON('not json'));