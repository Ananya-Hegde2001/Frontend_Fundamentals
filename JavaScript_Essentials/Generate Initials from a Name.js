function getInitials(name) {
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('.');
}

console.log(getInitials("John Doe"));            
console.log(getInitials("Albert Einstein"));     
console.log(getInitials("John Fitzgerald Kennedy"));