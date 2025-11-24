var subsets = function(nums) {
    const result = [];

    function dfs(i, path) {
        if (i === nums.length) {
            result.push([...path]);
            return;
        }
        // include
        dfs(i + 1, [...path, nums[i]]);
        // exclude
        dfs(i + 1, path);
    }

    dfs(0, []);
    return result;
};
