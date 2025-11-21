var sortedArrayToBST = function(nums) {
    function build(l, r) {
        if (l > r) return null;
        const mid = Math.floor((l + r) / 2);
        const node = new TreeNode(nums[mid]);
        node.left = build(l, mid - 1);
        node.right = build(mid + 1, r);
        return node;
    }
    return build(0, nums.length - 1);
};
