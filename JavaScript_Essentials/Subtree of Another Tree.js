var isSubtree = function(root, subRoot) {
    if (!root) return false;

    const isSame = (a, b) => {
        if (!a && !b) return true;
        if (!a || !b || a.val !== b.val) return false;
        return isSame(a.left, b.left) && isSame(a.right, b.right);
    };

    if (isSame(root, subRoot)) return true;
    return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
};
