function floodFill(img, sr, sc, newColor) {
  let color = img[sr][sc];
  if (color === newColor) return img;

  function dfs(r, c) {
    if (r < 0 || r >= img.length || c < 0 || c >= img[0].length || img[r][c] !== color) 
      return;

    img[r][c] = newColor;
    dfs(r+1,c); dfs(r-1,c); dfs(r,c+1); dfs(r,c-1);
  }

  dfs(sr, sc);
  return img;
}

console.log(floodFill([[1,1,1],[1,1,0],[1,0,1]], 1, 1, 2));
