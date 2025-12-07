const permute = (s) => {
  if (s.length <= 1) return [s];
  let result = [];

  for (let i = 0; i < s.length; i++) {
    let rest = s.slice(0, i) + s.slice(i + 1);
    for (let p of permute(rest)) result.push(s[i] + p);
  }
  return result;
};
