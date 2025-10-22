const person = {
  name: "Ananya",
  age: 22,
  contact: { email: "ana@example.com", phone: "12345" }
};

const { name, contact: { email } } = person;
console.log(name, email);

person.greet = function() {
  return `Hi, I'm ${this.name}`;
};cd 

console.log(person.greet());
