function outer() {
  let count = 0;
  return function inner() {
    count++;
    console.log("Count:", count);
  };
}

const counter = outer();
counter(); 
counter(); 
