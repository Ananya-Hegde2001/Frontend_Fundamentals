function soundex(str) {
  str = str.toUpperCase().replace(/[^A-Z]/g, '');
  if (!str) return '';
  
  const firstLetter = str[0];
  
  const codes = {
    'B': '1', 'F': '1', 'P': '1', 'V': '1',
    'C': '2', 'G': '2', 'J': '2', 'K': '2', 'Q': '2', 'S': '2', 'X': '2', 'Z': '2',
    'D': '3', 'T': '3',
    'L': '4',
    'M': '5', 'N': '5',
    'R': '6'
  };
  
  let soundexCode = firstLetter;
  let prevCode = codes[firstLetter] || '0';
  
  for (let i = 1; i < str.length && soundexCode.length < 4; i++) {
    const code = codes[str[i]] || '0';
    
    if (code !== '0' && code !== prevCode) {
      soundexCode += code;
    }
    
    if (code !== '0') {
      prevCode = code;
    }
  }
  
  while (soundexCode.length < 4) {
    soundexCode += '0';
  }
  
  return soundexCode;
}

console.log("=== Program 1: Soundex Algorithm ===");
console.log(soundex("Robert"));
console.log(soundex("Rupert"));
console.log(soundex("Smith"));
console.log(soundex("Smythe"));
console.log(soundex("Johnson"));
console.log(soundex("Jonson"));