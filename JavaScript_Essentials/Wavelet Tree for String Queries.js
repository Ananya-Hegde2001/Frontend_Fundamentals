function buildWaveletTree(text) {
  const alphabet = [...new Set(text)].sort();
  
  class WaveletNode {
    constructor(chars, text) {
      this.chars = chars;
      
      if (chars.length === 1) {
        this.isLeaf = true;
        this.char = chars[0];
        return;
      }
      
      this.isLeaf = false;
      const mid = Math.floor(chars.length / 2);
      const leftChars = chars.slice(0, mid);
      const rightChars = chars.slice(mid);
      
      this.bitmap = text.split('').map(c => rightChars.includes(c) ? 1 : 0);
      
      const leftText = text.split('').filter(c => leftChars.includes(c)).join('');
      const rightText = text.split('').filter(c => rightChars.includes(c)).join('');
      
      if (leftText) this.left = new WaveletNode(leftChars, leftText);
      if (rightText) this.right = new WaveletNode(rightChars, rightText);
    }
    
    rank(char, i) {
      if (this.isLeaf) {
        return this.char === char ? i : 0;
      }
      
      const leftChars = this.chars.slice(0, Math.floor(this.chars.length / 2));
      const isLeft = leftChars.includes(char);
      
      let count = 0;
      for (let j = 0; j < i && j < this.bitmap.length; j++) {
        if (this.bitmap[j] === (isLeft ? 0 : 1)) count++;
      }
      
      if (isLeft && this.left) {
        return this.left.rank(char, count);
      } else if (!isLeft && this.right) {
        return this.right.rank(char, count);
      }
      
      return 0;
    }
  }
  
  const root = new WaveletTree(alphabet, text);
  
  return {
    text,
    alphabet,
    rank: (char, i) => root.rank(char, i),
    count: (char) => root.rank(char, text.length),
    structure: 'Wavelet Tree'
  };
}

console.log("\n=== Program 3: Wavelet Tree ===");
const wavelet = buildWaveletTree("banana");
console.log({
  text: wavelet.text,
  countA: wavelet.count('a'),
  countN: wavelet.count('n'),
  rankA3: wavelet.rank('a', 3)
});