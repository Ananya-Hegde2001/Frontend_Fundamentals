class Stack {
  constructor() {
    this.items = [];
  }

  push(element) {
    this.items.push(element);
    console.log(`${element} pushed to stack`);
  }

  pop() {
    if (this.isEmpty()) {
      console.log("Stack is empty");
      return;
    }
    console.log(`${this.items.pop()} popped from stack`);
  }

  peek() {
    if (this.isEmpty()) {
      console.log("Stack is empty");
      return;
    }
    console.log(`Top element is ${this.items[this.items.length - 1]}`);
  }

  isEmpty() {
    return this.items.length === 0;
  }

  printStack() {
    console.log("Stack elements:", this.items.join(" "));
  }
}

const stack = new Stack();

stack.push(10);
stack.push(20);
stack.push(30);

stack.printStack(); 

stack.peek();       

stack.pop();        
stack.printStack(); 
