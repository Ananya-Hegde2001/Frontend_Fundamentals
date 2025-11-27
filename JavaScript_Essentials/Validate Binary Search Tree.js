var isValidBST = function(root) {
    function dfs(node, min, max) {
        if (!node) return true;

        if (node.val <= min || node.val >= max) return false;

        return dfs(node.left, min, node.val) &&
               dfs(node.right, node.val, max);
    }

    return dfs(root, -Infinity, Infinity);
};
