console.log("Before");
setTimeout(() => {
  console.log("Reading User from DB");
}, 2000);
console.log("After");

// Output
// Before
// After
// Reading User from DB
