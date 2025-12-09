function convertZigzag(s, numRows) {
  if (numRows === 1) return s;

  let rows = Array(numRows).fill("");
  let i = 0, down = true;

  for (let ch of s) {
    rows[i] += ch;
    if (i === 0) down = true;
    else if (i === numRows - 1) down = false;

    i += down ? 1 : -1;
  }

  return rows.join("");
}

console.log(convertZigzag("PAYPALISHIRING", 3));
