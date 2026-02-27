function camelToSnake(str) {
  return str.replace(/([A-Z])/g, '_$1').toLowerCase();
}

console.log(camelToSnake("myVariableName"));   
console.log(camelToSnake("getUserFullName"));  
console.log(camelToSnake("parseJSONData"));    