class Stack {
  constructor() {
    this.items = [];
  }

  push(el) { this.items.push(el); }
  pop() { return this.items.pop(); }
  peek() { return this.items[this.items.length - 1]; }
  isEmpty() { return this.items.length === 0; }
}

let st = new Stack();
st.push(10);
st.push(20);
console.log(st.pop());
