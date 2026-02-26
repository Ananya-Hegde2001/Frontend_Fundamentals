function extractNumbers(str) {
  const matches = str.match(/\d+(\.\d+)?/g);
  return matches ? matches.map(Number) : [];
}

console.log(extractNumbers("I have 2 cats and 3.5 kg of food"));

console.log(extractNumbers("Room 101 on floor 3"));
