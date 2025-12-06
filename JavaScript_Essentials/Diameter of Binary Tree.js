var diameterOfBinaryTree = function(root) {
    let diameter = 0;

    const depth = (node) => {
        if (!node) return 0;
        let left = depth(node.left);
        let right = depth(node.right);
        diameter = Math.max(diameter, left + right);
        return 1 + Math.max(left, right);
    };

    depth(root);
    return diameter;
};
