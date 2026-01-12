function toBase64(str) {
  return btoa(unescape(encodeURIComponent(str)));
}

function fromBase64(str) {
  return decodeURIComponent(escape(atob(str)));
}

console.log("\n=== Program 3: Base64 Encoding ===");
const encoded = toBase64("Hello World");
console.log("Encoded:", encoded);
console.log("Decoded:", fromBase64(encoded));

const encoded2 = toBase64("JavaScript 💻");
console.log("Encoded:", encoded2);
console.log("Decoded:", fromBase64(encoded2));