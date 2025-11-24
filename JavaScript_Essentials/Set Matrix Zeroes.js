var setZeroes = function(matrix) {
    let rows = new Set();
    let cols = new Set();

    for (let r = 0; r < matrix.length; r++) {
        for (let c = 0; c < matrix[0].length; c++) {
            if (matrix[r][c] === 0) {
                rows.add(r);
                cols.add(c);
            }
        }
    }

    for (let r of rows) {
        for (let c = 0; c < matrix[0].length; c++) matrix[r][c] = 0;
    }

    for (let c of cols) {
        for (let r = 0; r < matrix.length; r++) matrix[r][c] = 0;
    }
};
