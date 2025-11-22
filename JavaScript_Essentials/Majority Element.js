var majorityElement = function(nums) {
    let count = 0, candidate = null;
    for (let n of nums) {
        if (count === 0) candidate = n;
        count += (n === candidate) ? 1 : -1;
    }
    return candidate;
};
