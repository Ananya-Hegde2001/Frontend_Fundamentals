function quickSort(arr) {
  if (arr.length < 2) return arr;

  let pivot = arr[0];
  let left = arr.filter(x => x < pivot);
  let right = arr.filter(x => x > pivot);

  return [...quickSort(left), pivot, ...quickSort(right)];
}

console.log(quickSort([7, 3, 9, 1, 4]));
