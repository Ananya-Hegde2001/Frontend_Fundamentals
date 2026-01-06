function parseQueryString(queryString) {
  if (!queryString || queryString === '') return {};
  
  const str = queryString.startsWith('?') ? queryString.slice(1) : queryString;
  
  return str.split('&').reduce((acc, param) => {
    const [key, value] = param.split('=');
    acc[decodeURIComponent(key)] = decodeURIComponent(value || '');
    return acc;
  }, {});
}

console.log("\n=== Program 3: Parse Query String ===");
console.log(parseQueryString("?name=John&age=30&city=NYC"));
console.log(parseQueryString("search=javascript&page=1"));
console.log(parseQueryString("?email=test%40example.com"));