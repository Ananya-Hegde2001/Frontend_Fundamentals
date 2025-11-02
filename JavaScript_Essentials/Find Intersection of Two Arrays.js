let arr1 = [1, 2, 3, 4];
let arr2 = [3, 4, 5, 6];
let intersection = arr1.filter(item => arr2.includes(item));
console.log("Intersection:", intersection);
