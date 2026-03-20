class Graph {
  constructor() { this.adjacency = new Map(); }

  addVertex(v) {
    if (!this.adjacency.has(v)) this.adjacency.set(v, []);
  }

  addEdge(u, v, weight) {
    this.adjacency.get(u).push({ node: v, weight });
    this.adjacency.get(v).push({ node: u, weight });
  }

  dijkstra(start) {
    const dist  = {};
    const prev  = {};
    const visited = new Set();

    for (let [v] of this.adjacency) {
      dist[v] = Infinity;
      prev[v] = null;
    }
    dist[start] = 0;

    // Min-heap simulation using sorted array
    const pq = [{ node: start, dist: 0 }];

    while (pq.length) {
      pq.sort((a, b) => a.dist - b.dist);
      const { node } = pq.shift();

      if (visited.has(node)) continue;
      visited.add(node);

      for (const { node: neighbor, weight } of this.adjacency.get(node)) {
        if (visited.has(neighbor)) continue;
        const newDist = dist[node] + weight;
        if (newDist < dist[neighbor]) {
          dist[neighbor] = newDist;
          prev[neighbor] = node;
          pq.push({ node: neighbor, dist: newDist });
        }
      }
    }
    return { dist, prev };
  }

  shortestPath(start, end) {
    const { dist, prev } = this.dijkstra(start);
    const path = [];
    let curr = end;
    while (curr) { path.unshift(curr); curr = prev[curr]; }
    return { path, cost: dist[end] };
  }

  // Detect cycle using DFS
  hasCycle() {
    const visited = new Set();
    const dfs = (node, parent) => {
      visited.add(node);
      for (const { node: n } of this.adjacency.get(node)) {
        if (!visited.has(n)) { if (dfs(n, node)) return true; }
        else if (n !== parent) return true;
      }
      return false;
    };
    for (let [v] of this.adjacency)
      if (!visited.has(v) && dfs(v, null)) return true;
    return false;
  }
}

// Usage
const g = new Graph();
["A","B","C","D","E"].forEach(v => g.addVertex(v));
g.addEdge("A","B", 4);
g.addEdge("A","C", 2);
g.addEdge("C","B", 1);
g.addEdge("B","D", 5);
g.addEdge("C","E", 8);
g.addEdge("E","D", 2);

const { path, cost } = g.shortestPath("A", "D");
console.log("Shortest Path:", path.join(" → ")); // A → C → B → D
console.log("Total Cost:   ", cost);              // 8
console.log("Has Cycle:    ", g.hasCycle());      // true