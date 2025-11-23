var insert = function(intervals, newInterval) {
    const result = [];

    for (let interval of intervals) {
        if (interval[1] < newInterval[0]) {
            result.push(interval);
        } else if (interval[0] > newInterval[1]) {
            result.push(newInterval);
            newInterval = interval;
        } else {
            newInterval[0] = Math.min(newInterval[0], interval[0]);
            newInterval[1] = Math.max(newInterval[1], interval[1]);
        }
    }
    result.push(newInterval);
    return result;
};
