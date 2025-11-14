function permute(arr) {
  let result = [];

  function backtrack(current, remaining) {
    if (remaining.length === 0) {
      result.push(current);
      return;
    }

    for (let i = 0; i < remaining.length; i++) {
      backtrack(
        [...current, remaining[i]],
        remaining.filter((_, idx) => idx !== i)
      );
    }
  }

  backtrack([], arr);
  return result;
}

console.log(permute([1, 2, 3]));
