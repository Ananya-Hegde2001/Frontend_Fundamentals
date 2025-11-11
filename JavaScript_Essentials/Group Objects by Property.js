let data = [
  { name: "Alice", city: "NY" },
  { name: "Bob", city: "LA" },
  { name: "Eve", city: "NY" }
];

let grouped = data.reduce((acc, obj) => {
  acc[obj.city] = acc[obj.city] || [];
  acc[obj.city].push(obj);
  return acc;
}, {});

console.log(grouped);
