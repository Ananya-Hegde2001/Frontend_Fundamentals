function twoSum(arr, target) {
    let map = {};

    for (let i = 0; i < arr.length; i++) {
        let complement = target - arr[i];

        if (map.hasOwnProperty(complement)) {
            return [map[complement], i];
        }

        map[arr[i]] = i;
    }

    return "No pair found";
}

// Example
console.log(twoSum([2,7,11,15], 9));
