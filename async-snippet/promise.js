const p = new Promise((resolve, reject) => {
  // Kick of Async work
  //....
  // Value || an Error
  // return to consumer

  setTimeout(() => {
    // resolve(1); // initial pending to => resolved, fullfiled
    reject(new Error(" Promise Reject message")); // pending => rejected
  }, 2000);
});

p.then(result => {
  console.log("Result", result);
}).catch(err => console.log("Error", err.message));
