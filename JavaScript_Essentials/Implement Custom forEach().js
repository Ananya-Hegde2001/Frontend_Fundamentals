Array.prototype.myForEach = function(callback) {
  for (let i = 0; i < this.length; i++) {
    callback(this[i], i, this);
  }
};

[1, 2, 3].myForEach((num, i) => console.log(`Index ${i}: ${num}`));
