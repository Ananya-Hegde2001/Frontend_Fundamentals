function countVowelsAndConsonants(str) {
  const lower = str.toLowerCase().replace(/[^a-z]/g, '');
  const vowels = lower.split('').filter(c => 'aeiou'.includes(c)).length;
  const consonants = lower.length - vowels;
  return { vowels, consonants };
}

console.log(countVowelsAndConsonants("Hello World"));
