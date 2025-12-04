var kthSmallest = function(root, k) {
    let stack = [];

    while (true) {
        while (root) {
            stack.push(root);
            root = root.left;
        }
        root = stack.pop();
        if (--k === 0) return root.val;
        root = root.right;
    }
};
