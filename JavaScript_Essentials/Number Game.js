function isPrime(num) {
  if (num <= 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

for (let i = 1; i <= 20; i++) {
  if (isPrime(i)) {
    console.log("Prime");
  } else if (i % 2 === 0) {
    console.log("Even");
  } else {
    console.log("Odd");
  }
}
