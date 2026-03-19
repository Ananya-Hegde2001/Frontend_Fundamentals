class Node {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor() { this.root = null; }

  insert(val) {
    const node = new Node(val);
    if (!this.root) { this.root = node; return; }
    let curr = this.root;
    while (true) {
      if (val < curr.val) {
        if (!curr.left) { curr.left = node; break; }
        curr = curr.left;
      } else {
        if (!curr.right) { curr.right = node; break; }
        curr = curr.right;
      }
    }
  }

  search(val) {
    let curr = this.root;
    while (curr) {
      if (val === curr.val) return true;
      curr = val < curr.val ? curr.left : curr.right;
    }
    return false;
  }

  inOrder(node = this.root, result = []) {
    if (!node) return result;
    this.inOrder(node.left, result);
    result.push(node.val);
    this.inOrder(node.right, result);
    return result;
  }

  levelOrder() {
    if (!this.root) return [];
    const queue = [this.root], result = [];
    while (queue.length) {
      const node = queue.shift();
      result.push(node.val);
      if (node.left)  queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    return result;
  }

  delete(val) {
    this.root = this._delete(this.root, val);
  }

  _delete(node, val) {
    if (!node) return null;
    if (val < node.val) node.left = this._delete(node.left, val);
    else if (val > node.val) node.right = this._delete(node.right, val);
    else {
      if (!node.left) return node.right;
      if (!node.right) return node.left;
      let min = node.right;
      while (min.left) min = min.left;
      node.val = min.val;
      node.right = this._delete(node.right, min.val);
    }
    return node;
  }
}

const bst = new BST();
[15, 10, 20, 8, 12, 17, 25].forEach(v => bst.insert(v));

console.log("In-Order:   ", bst.inOrder()); 
console.log("Level-Order:", bst.levelOrder());
console.log("Search 12:  ", bst.search(12));  
bst.delete(10);
console.log("After delete 10:", bst.inOrder());