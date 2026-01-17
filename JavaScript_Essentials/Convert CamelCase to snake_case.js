function camelToSnake(str) {
  return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
}

console.log("\n=== BONUS Program 8: CamelCase to snake_case ===");
console.log(camelToSnake("helloWorld"));
console.log(camelToSnake("myVariableName"));
console.log(camelToSnake("getUserById"));