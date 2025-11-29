var removeElement = function(nums, val) {
    let i = 0;
    for (let num of nums) {
        if (num !== val) nums[i++] = num;
    }
    return i;
};
