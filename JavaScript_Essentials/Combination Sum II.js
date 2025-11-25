var combinationSum2 = function(candidates, target) {
    candidates.sort((a, b) => a - b);
    let result = [];

    function backtrack(start, sum, path) {
        if (sum === target) {
            result.push([...path]);
            return;
        }

        for (let i = start; i < candidates.length; i++) {
            if (i > start && candidates[i] === candidates[i - 1]) continue;
            if (sum + candidates[i] > target) break;

            path.push(candidates[i]);
            backtrack(i + 1, sum + candidates[i], path);
            path.pop();
        }
    }

    backtrack(0, 0, []);
    return result;
};
