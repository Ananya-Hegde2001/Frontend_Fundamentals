function snakeToCamel(str) {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

console.log("\n=== BONUS Program 9: snake_case to camelCase ===");
console.log(snakeToCamel("hello_world"));
console.log(snakeToCamel("my_variable_name"));
console.log(snakeToCamel("get_user_by_id"));