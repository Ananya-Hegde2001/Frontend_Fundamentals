function binarySearch(arr, target) {
  let l = 0, r = arr.length - 1;

  while (l <= r) {
    let mid = Math.floor((l + r) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) l = mid + 1;
    else r = mid - 1;
  }

  return -1;
}

console.log(binarySearch([1, 3, 5, 7, 9], 7));
