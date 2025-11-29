var isPerfectSquare = function(num) {
    let l = 1, r = num;
    while (l <= r) {
        let mid = Math.floor((l + r) / 2);
        if (mid * mid === num) return true;
        if (mid * mid < num) l = mid + 1;
        else r = mid - 1;
    }
    return false;
};
