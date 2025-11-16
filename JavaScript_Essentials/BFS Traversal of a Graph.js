function bfs(graph, start) {
  let visited = new Set();
  let queue = [start];

  while (queue.length) {
    let node = queue.shift();
    if (!visited.has(node)) {
      visited.add(node);
      console.log(node);

      for (let neighbor of graph[node]) {
        if (!visited.has(neighbor)) queue.push(neighbor);
      }
    }
  }
}

bfs({
  0: [1, 2],
  1: [2],
  2: [0, 3],
  3: [3]
}, 2);
