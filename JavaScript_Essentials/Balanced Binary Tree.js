function isBalanced(root) {
  function check(node) {
    if (!node) return [true, 0];

    let [leftBal, leftHeight] = check(node.left);
    let [rightBal, rightHeight] = check(node.right);

    let balanced =
      leftBal && rightBal && Math.abs(leftHeight - rightHeight) <= 1;

    return [balanced, 1 + Math.max(leftHeight, rightHeight)];
  }

  return check(root)[0];
}
