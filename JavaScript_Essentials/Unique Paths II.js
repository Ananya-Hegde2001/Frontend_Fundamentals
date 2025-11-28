var uniquePathsWithObstacles = function(grid) {
    let m = grid.length;
    let n = grid[0].length;

    let dp = Array(m).fill().map(() => Array(n).fill(0));

    if (grid[0][0] === 1) return 0;
    dp[0][0] = 1;

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 1) continue;

            if (i > 0) dp[i][j] += dp[i - 1][j];
            if (j > 0) dp[i][j] += dp[i][j - 1];
        }
    }

    return dp[m - 1][n - 1];
};
