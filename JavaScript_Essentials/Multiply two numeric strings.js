const multiply = (num1, num2) => {
  let res = Array(num1.length + num2.length).fill(0);

  for (let i = num1.length-1; i >= 0; i--) {
    for (let j = num2.length-1; j >= 0; j--) {
      let mul = (num1[i] - 0) * (num2[j] - 0);
      let sum = mul + res[i + j + 1];
      res[i + j + 1] = sum % 10;
      res[i + j] += Math.floor(sum / 10);
    }
  }
  return res.join("").replace(/^0+/, "") || "0";
};
