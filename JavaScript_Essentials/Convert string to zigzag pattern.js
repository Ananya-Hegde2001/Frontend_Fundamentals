function zigzagConvert(str, numRows) {
  if (numRows === 1 || numRows >= str.length) return str;
  
  const rows = Array.from({ length: numRows }, () => []);
  let currentRow = 0;
  let goingDown = false;
  
  for (let char of str) {
    rows[currentRow].push(char);
    
    if (currentRow === 0 || currentRow === numRows - 1) {
      goingDown = !goingDown;
    }
    
    currentRow += goingDown ? 1 : -1;
  }
  
  return rows.map(row => row.join('')).join('');
}

console.log("=== Program 1: Zigzag Conversion ===");
console.log(zigzagConvert("PAYPALISHIRING", 3)); 
console.log(zigzagConvert("PAYPALISHIRING", 4)); 
console.log(zigzagConvert("HELLO", 2)); 