var levelOrder = function(root) {
    if (!root) return [];
    let queue = [root];
    let result = [];

    while (queue.length) {
        let size = queue.length;
        let level = [];

        for (let i = 0; i < size; i++) {
            let node = queue.shift();
            level.push(node.val);

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        result.push(level);
    }

    return result;
};
