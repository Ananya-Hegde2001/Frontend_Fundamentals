// Sort an array of student objects by their scores in descending order
let students = [
  { name: "Ananya", score: 85 },
  { name: "Rahul", score: 92 },
  { name: "Priya", score: 78 }
];

students.sort((a, b) => b.score - a.score);

console.log(students);
