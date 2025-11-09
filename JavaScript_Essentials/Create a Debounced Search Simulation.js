function debounce(func, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}

const search = debounce(query => console.log("Searching for:", query), 500);

search("re");
search("react");
search("react js"); 
