var searchMatrix = function(matrix, target) {
    let rows = matrix.length, cols = matrix[0].length;
    let l = 0, r = rows*cols - 1;

    while (l <= r) {
        let mid = Math.floor((l+r)/2);
        let val = matrix[Math.floor(mid/cols)][mid % cols];

        if (val === target) return true;
        if (val < target) l = mid + 1;
        else r = mid - 1;
    }
    return false;
};
