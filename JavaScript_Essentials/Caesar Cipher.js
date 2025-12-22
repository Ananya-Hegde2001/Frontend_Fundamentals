function caesarCipher(str, shift) {
  shift = shift % 26; 
  let result = '';
  
  for (let char of str) {
    if (char >= 'a' && char <= 'z') {
      let code = char.charCodeAt(0) - 'a'.charCodeAt(0);
      code = (code + shift + 26) % 26;
      result += String.fromCharCode(code + 'a'.charCodeAt(0));
    } else if (char >= 'A' && char <= 'Z') {
      let code = char.charCodeAt(0) - 'A'.charCodeAt(0);
      code = (code + shift + 26) % 26;
      result += String.fromCharCode(code + 'A'.charCodeAt(0));
    } else {
      result += char;
    }
  }
  
  return result;
}

console.log("=== Program 1: Caesar Cipher ===");
console.log(caesarCipher("Hello World", 3)); 
console.log(caesarCipher("abc", 1)); 
console.log(caesarCipher("xyz", 3)); 
console.log(caesarCipher("Khoor Zruog", -3));