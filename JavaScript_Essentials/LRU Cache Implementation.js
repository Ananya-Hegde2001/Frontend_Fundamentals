class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();
  }

  get(key) {
    if (!this.map.has(key)) return -1;
    const val = this.map.get(key);
    this.map.delete(key);
    this.map.set(key, val); 
    return val;
  }

  put(key, value) {
    if (this.map.has(key)) this.map.delete(key);
    else if (this.map.size === this.capacity) {
      this.map.delete(this.map.keys().next().value);
    }
    this.map.set(key, value);
  }

  display() {
    console.log([...this.map.entries()]);
  }
}

// Usage
const cache = new LRUCache(3);
cache.put(1, "one");
cache.put(2, "two");
cache.put(3, "three");
cache.get(1);       
cache.put(4, "four"); 
cache.display();