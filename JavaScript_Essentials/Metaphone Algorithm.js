function metaphone(str, maxLength = 4) {
  str = str.toUpperCase().replace(/[^A-Z]/g, '');
  if (!str) return '';
  
  let metaphoneKey = '';
  let i = 0;
  
  // Remove leading characters
  if (str.match(/^(KN|GN|PN|AE|WR)/)) {
    i = 1;
  }
  if (str[0] === 'X') {
    str = 'S' + str.slice(1);
  }
  if (str.match(/^WH/)) {
    str = 'W' + str.slice(2);
  }
  
  while (i < str.length && metaphoneKey.length < maxLength) {
    const c = str[i];
    const next = str[i + 1] || '';
    const prev = i > 0 ? str[i - 1] : '';
    
    if (c === prev && c !== 'C') {
      i++;
      continue;
    }
    
    switch (c) {
      case 'B':
        if (i === str.length - 1 && prev === 'M') break;
        metaphoneKey += 'B';
        break;
      case 'C':
        if (next === 'H') {
          metaphoneKey += 'X';
          i++;
        } else if ('IEY'.includes(next)) {
          metaphoneKey += 'S';
        } else {
          metaphoneKey += 'K';
        }
        break;
      case 'D':
        metaphoneKey += 'GEI'.includes(next) ? 'J' : 'T';
        break;
      case 'G':
        if (next === 'H' && i === str.length - 2) break;
        if (next === 'N' && i === str.length - 2) break;
        if ('IEY'.includes(next)) {
          metaphoneKey += 'J';
        } else {
          metaphoneKey += 'K';
        }
        break;
      case 'H':
        if (!'AEIOU'.includes(prev) || !'AEIOU'.includes(next)) break;
        metaphoneKey += 'H';
        break;
      case 'K':
        if (prev !== 'C') metaphoneKey += 'K';
        break;
      case 'P':
        metaphoneKey += next === 'H' ? 'F' : 'P';
        if (next === 'H') i++;
        break;
      case 'Q':
        metaphoneKey += 'K';
        break;
      case 'S':
        if (next === 'H') {
          metaphoneKey += 'X';
          i++;
        } else if (str.substr(i, 3) === 'SIO' || str.substr(i, 3) === 'SIA') {
          metaphoneKey += 'X';
        } else {
          metaphoneKey += 'S';
        }
        break;
      case 'T':
        if (str.substr(i, 3) === 'TIO' || str.substr(i, 3) === 'TIA') {
          metaphoneKey += 'X';
        } else if (next === 'H') {
          metaphoneKey += '0';
          i++;
        } else if (str.substr(i, 2) !== 'TCH') {
          metaphoneKey += 'T';
        }
        break;
      case 'V':
        metaphoneKey += 'F';
        break;
      case 'W':
      case 'Y':
        if ('AEIOU'.includes(next)) metaphoneKey += c;
        break;
      case 'X':
        metaphoneKey += 'KS';
        break;
      case 'Z':
        metaphoneKey += 'S';
        break;
      default:
        if ('AEIOU'.includes(c)) {
          if (i === 0) metaphoneKey += c;
        } else if ('FHJLMNR'.includes(c)) {
          metaphoneKey += c;
        }
    }
    
    i++;
  }
  
  return metaphoneKey;
}

console.log("\n=== Program 2: Metaphone Algorithm ===");
console.log(metaphone("knight"));
console.log(metaphone("night"));
console.log(metaphone("phone"));
console.log(metaphone("fone"));
console.log(metaphone("catherine"));
console.log(metaphone("katherine"));