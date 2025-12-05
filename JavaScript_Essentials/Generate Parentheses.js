var generateParenthesis = function(n) {
    let result = [];

    const backtrack = (s, open, close) => {
        if (s.length === n * 2) {
            result.push(s);
            return;
        }
        if (open < n) backtrack(s + "(", open + 1, close);
        if (close < open) backtrack(s + ")", open, close + 1);
    };

    backtrack("", 0, 0);
    return result;
};
