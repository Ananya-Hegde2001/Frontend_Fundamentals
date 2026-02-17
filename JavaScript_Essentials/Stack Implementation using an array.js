class Stack {
  constructor() {
    this.items = [];
  }

  push(element) {
    this.items.push(element);
    console.log(`Pushed: ${element}`);
  }

  pop() {
    if (this.isEmpty()) {
      console.log("Stack is empty. Nothing to pop.");
      return null;
    }
    const removed = this.items.pop();
    console.log(`Popped: ${removed}`);
    return removed;
  }

  peek() {
    if (this.isEmpty()) return null;
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }

  display() {
    console.log("Stack (top → bottom):", [...this.items].reverse().join(", "));
  }
}

const stack = new Stack();
stack.push(10);
stack.push(20);
stack.push(30);
stack.display();
console.log("Top element:", stack.peek());
stack.pop();
stack.display();
console.log("Stack size:", stack.size());