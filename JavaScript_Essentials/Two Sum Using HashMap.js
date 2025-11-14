function twoSum(arr, target) {
  let map = new Map();

  for (let i = 0; i < arr.length; i++) {
    let need = target - arr[i];
    if (map.has(need)) return [map.get(need), i];
    map.set(arr[i], i);
  }
}
console.log(twoSum([2,7,11,15], 9));
