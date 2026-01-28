for (let i = 1; i <= 50; i++) {
  if (i % 4 === 0 && i % 6 === 0) {
    console.log("BuzzPop");
  } else if (i % 4 === 0) {
    console.log("Buzz");
  } else if (i % 6 === 0) {
    console.log("Pop");
  } else {
    console.log(i);
  }
}
