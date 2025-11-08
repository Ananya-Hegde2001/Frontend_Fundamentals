function flattenObj(obj, parent = '', res = {}) {
  for (let key in obj) {
    let prop = parent ? `${parent}.${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null)
      flattenObj(obj[key], prop, res);
    else res[prop] = obj[key];
  }
  return res;
}

let obj = { a: { b: { c: 1 } }, d: 2 };
console.log(flattenObj(obj));
