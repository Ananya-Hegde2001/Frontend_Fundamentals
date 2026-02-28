function snakeToCamel(str) {
  return str.replace(/_([a-z])/g, (_, char) => char.toUpperCase());
}

console.log(snakeToCamel("my_variable_name"));   
console.log(snakeToCamel("get_user_full_name"));  
console.log(snakeToCamel("parse_json_data"));     