// Callback approach

// getCustomer(1, customer => {
//   console.log("Customer: ", customer);
//   if (customer.isGold) {
//     getTopMovies(movies => {
//       console.log("Top movies: ", movies);
//       sendEmail(customer.email, movies, () => {
//         console.log("Email sent...");
//       });
//     });
//   }
// });

// Async and Await approach

async function notifyCustmoer() {
  try {
    const customer = await getCustomer(1);
    console.log("Customer: ", customer);
    if (customer.isGold) {
      const movies = await getTopMovies();
      console.log("Top movies: ", movies);
      const ema = await sendEmail(customer, movies);
    }
  } catch (err) {
    console.log("Error", err.message);
  }
}
notifyCustmoer();
function getCustomer(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("get Customer API ..");
      resolve({
        id: 1,
        name: "Mosh Hamedani",
        isGold: true,
        email: "email"
      });
    }, 4000);
  });
}

function getTopMovies() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("get Top Movies API...");
      resolve(["movie1", "movie2"]);
    }, 4000);
  });
}

function sendEmail(email, movies) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Email sent...");
      resolve();
    }, 4000);
  });
}
