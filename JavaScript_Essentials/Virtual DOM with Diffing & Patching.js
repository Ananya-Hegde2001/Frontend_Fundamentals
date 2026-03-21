// Create virtual DOM node
const createElement = (type, props = {}, ...children) => ({
  type,
  props: { ...props, children: children.flat() }
});

// Render vDOM to real DOM
const render = (vNode) => {
  if (typeof vNode === "string" || typeof vNode === "number") {
    return document.createTextNode(vNode);
  }

  const el = document.createElement(vNode.type);

  // Set props
  Object.entries(vNode.props || {}).forEach(([key, val]) => {
    if (key === "children") return;
    if (key.startsWith("on")) {
      el.addEventListener(key.slice(2).toLowerCase(), val);
    } else {
      el.setAttribute(key, val);
    }
  });

  // Render children
  (vNode.props.children || []).forEach(child => {
    el.appendChild(render(child));
  });

  return el;
};

// Diff & Patch
const diff = (parent, oldVNode, newVNode, index = 0) => {
  const child = parent.childNodes[index];

  // Node removed
  if (!newVNode) { if (child) parent.removeChild(child); return; }

  // Node added
  if (!oldVNode) { parent.appendChild(render(newVNode)); return; }

  // Text change
  if (typeof newVNode !== typeof oldVNode ||
      (typeof newVNode === "string" && newVNode !== oldVNode)) {
    parent.replaceChild(render(newVNode), child);
    return;
  }

  // Type changed
  if (newVNode.type !== oldVNode.type) {
    parent.replaceChild(render(newVNode), child);
    return;
  }

  // Update props
  const newProps = newVNode.props || {};
  const oldProps = oldVNode.props || {};

  // Remove old props
  Object.keys(oldProps).forEach(key => {
    if (key === "children") return;
    if (!(key in newProps)) child.removeAttribute(key);
  });

  // Set new props
  Object.entries(newProps).forEach(([key, val]) => {
    if (key === "children") return;
    if (oldProps[key] !== val) {
      if (key.startsWith("on")) {
        child.addEventListener(key.slice(2).toLowerCase(), val);
      } else {
        child.setAttribute(key, val);
      }
    }
  });

  // Diff children recursively
  const newChildren = newProps.children || [];
  const oldChildren = oldProps.children || [];
  const maxLen = Math.max(newChildren.length, oldChildren.length);

  for (let i = 0; i < maxLen; i++) {
    diff(child, oldChildren[i], newChildren[i], i);
  }
};

// --- Mini Component System ---
class Component {
  constructor(props) {
    this.props = props;
    this.state = {};
    this._vdom = null;
    this._container = null;
  }

  setState(newState) {
    const oldVDom = this._vdom;
    this.state = { ...this.state, ...newState };
    this._vdom = this.render();
    diff(this._container, oldVDom, this._vdom);
  }

  mount(container) {
    this._container = container;
    this._vdom = this.render();
    container.appendChild(render(this._vdom));
  }

  render() { return null; }
}

// Usage: Counter Component
class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  render() {
    return createElement("div", { class: "counter" },
      createElement("h2", {}, `Count: ${this.state.count}`),
      createElement("button", {
        onClick: () => this.setState({ count: this.state.count + 1 })
      }, "Increment"),
      createElement("button", {
        onClick: () => this.setState({ count: this.state.count - 1 })
      }, "Decrement")
    );
  }
}

const app = new Counter({});
app.mount(document.getElementById("root"));