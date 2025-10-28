let str = "JavaScript is an amazing programming language";
let words = str.split(" ");
let longest = "";

for (let word of words) {
  if (word.length > longest.length) {
    longest = word;
  }
}

console.log("Longest word:", longest);
