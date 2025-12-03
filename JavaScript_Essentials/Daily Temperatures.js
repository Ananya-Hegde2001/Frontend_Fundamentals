var dailyTemperatures = function(temps) {
    let stack = [];
    let res = Array(temps.length).fill(0);

    for (let i = 0; i < temps.length; i++) {
        while (stack.length && temps[i] > temps[stack[stack.length-1]]) {
            let idx = stack.pop();
            res[idx] = i - idx;
        }
        stack.push(i);
    }
    return res;
};
