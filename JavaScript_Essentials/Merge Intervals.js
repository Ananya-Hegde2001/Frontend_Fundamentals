var merge = function(intervals) {
    intervals.sort((a, b) => a[0] - b[0]);
    const result = [ intervals[0] ];

    for (let i = 1; i < intervals.length; i++) {
        let prev = result[result.length - 1];
        let curr = intervals[i];

        if (curr[0] <= prev[1]) {
            prev[1] = Math.max(prev[1], curr[1]);
        } else {
            result.push(curr);
        }
    }
    return result;
};
