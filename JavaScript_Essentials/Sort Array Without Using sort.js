let arr = [4, 2, 7, 1, 3];

for (let i = 0; i < arr.length; i++) {
  for (let j = i + 1; j < arr.length; j++) {
    if (arr[i] > arr[j]) {
      [arr[i], arr[j]] = [arr[j], arr[i]]; 
    }
  }
}

console.log(arr);
