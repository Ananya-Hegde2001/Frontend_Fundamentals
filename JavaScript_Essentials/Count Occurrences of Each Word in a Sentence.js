let sentence = "This is a test. This test is easy.";
let words = sentence.toLowerCase().match(/\b\w+\b/g);
let freq = {};

for (let w of words) {
  freq[w] = (freq[w] || 0) + 1;
}

console.log(freq);
