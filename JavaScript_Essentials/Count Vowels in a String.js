let str = "JavaScript is awesome!";
let count = 0;

for (let char of str.toLowerCase()) {
  if ("aeiou".includes(char)) {
    count++;
  }
}

console.log(`Number of vowels: ${count}`);
