function createRope(text) {
  class RopeNode {
    constructor(text = '', left = null, right = null) {
      this.left = left;
      this.right = right;
      this.text = text;
      this.weight = left ? left.weight + (left.text || '').length : text.length;
    }
    
    charAt(index) {
      if (this.text) {
        return this.text[index] || null;
      }
      
      if (index < this.weight) {
        return this.left ? this.left.charAt(index) : null;
      } else {
        return this.right ? this.right.charAt(index - this.weight) : null;
      }
    }
    
    toString() {
      if (this.text) return this.text;
      return (this.left ? this.left.toString() : '') + 
             (this.right ? this.right.toString() : '');
    }
  }
  
  const splitAt = (node, index) => {
    if (node.text) {
      const left = new RopeNode(node.text.substring(0, index));
      const right = new RopeNode(node.text.substring(index));
      return { left, right };
    }
    
    if (index <= node.weight) {
      const split = splitAt(node.left, index);
      return {
        left: split.left,
        right: new RopeNode('', split.right, node.right)
      };
    } else {
      const split = splitAt(node.right, index - node.weight);
      return {
        left: new RopeNode('', node.left, split.left),
        right: split.right
      };
    }
  };
  
  const concat = (left, right) => {
    return new RopeNode('', left, right);
  };
  
  let root = new RopeNode(text);
  
  return {
    charAt: (i) => root.charAt(i),
    toString: () => root.toString(),
    split: (i) => {
      const { left, right } = splitAt(root, i);
      return {
        left: left.toString(),
        right: right.toString()
      };
    },
    concat: (other) => {
      root = concat(root, new RopeNode(other));
      return root.toString();
    },
    length: text.length,
    structure: 'Rope'
  };
}

console.log("\n=== BONUS Program 5: Rope Data Structure ===");
const rope = createRope("Hello World");
console.log({
  charAt5: rope.charAt(5),
  full: rope.toString(),
  split: rope.split(5)
});