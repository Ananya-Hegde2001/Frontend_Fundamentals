var isValidSudoku = function(board) {
    let rows = {}, cols = {}, boxes = {};

    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let val = board[r][c];
            if (val === ".") continue;

            let boxIndex = `${Math.floor(r/3)}-${Math.floor(c/3)}`;

            if (rows[`${r}-${val}`] || cols[`${c}-${val}`] || boxes[`${boxIndex}-${val}`])
                return false;

            rows[`${r}-${val}`] = cols[`${c}-${val}`] = boxes[`${boxIndex}-${val}`] = true;
        }
    }
    return true;
};
