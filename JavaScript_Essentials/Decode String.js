function decodeString(s) {
  let stack = [], curr = "", num = "";

  for (let ch of s) {
    if (!isNaN(ch)) num += ch;
    else if (ch === "[") {
      stack.push(curr);
      stack.push(Number(num));
      curr = ""; num = "";
    } else if (ch === "]") {
      let count = stack.pop();
      let prev = stack.pop();
      curr = prev + curr.repeat(count);
    } else curr += ch;
  }
  return curr;
}
