function caesarCipher(str, shift) {
  return str.replace(/[a-zA-Z]/g, char => {
    const base = char >= 'a' ? 97 : 65;
    return String.fromCharCode(((char.charCodeAt(0) - base + shift) % 26) + base);
  });
}

console.log(caesarCipher("Hello World", 3)); 
console.log(caesarCipher("Khoor Zruog", -3)); 