const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("Async Operation 1..");
    // reject(new Error("Async Op 1 rejected"));
    resolve(1);
  }, 2000);
});

const p2 = new Promise(resolve => {
  setTimeout(() => {
    console.log("Async Operation 2..");
    resolve(2);
  }, 1000);
});

Promise.all([p1, p2])
  .then(result => console.log(result))
  .catch(err => console.log("Erorr", err.message));
// Output [1,2]

// Promise.race([p1, p2])
//   .then(result => console.log(result))
//   .catch(err => console.log("Erorr", err.message));

// Output  2
