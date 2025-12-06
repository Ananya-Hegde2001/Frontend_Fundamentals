var buildTree = function(preorder, inorder) {
    if (!preorder.length) return null;

    let rootVal = preorder[0];
    let idx = inorder.indexOf(rootVal);

    return {
        val: rootVal,
        left: buildTree(preorder.slice(1, idx+1), inorder.slice(0, idx)),
        right: buildTree(preorder.slice(idx+1), inorder.slice(idx+1))
    };
};
