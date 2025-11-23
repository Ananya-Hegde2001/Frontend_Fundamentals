var combinationSum = function(candidates, target) {
    const result = [];

    function backtrack(start, sum, path) {
        if (sum === target) {
            result.push([...path]);
            return;
        }
        if (sum > target) return;

        for (let i = start; i < candidates.length; i++) {
            path.push(candidates[i]);
            backtrack(i, sum + candidates[i], path);
            path.pop();
        }
    }

    backtrack(0, 0, []);
    return result;
};
