require("express-async-errors");
const error = require("./middleware/error");
const winston = require("winston");
require("winston-mongodb");
const config = require("config");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require("./routes/users");
const auth = require("./routes/auth");
const express = require("express");
const app = express();

// Uncaught exceptions
// This only works in synchrous code
process.on("uncaughtException", ex => {
  console.log("Un Caught Exception");
  winston.error(ex.message, ex);
  // to kill the process
  process.exit(1);
});
winston.handleExceptions(
  new winston.transports.File({ filename: "logs/unCaughtErrors.log" })
);
// asynchrous code
process.on("unhandledRejection", ex => {
  console.log("Un Caught Exception");
  winston.error(ex.message, ex);
  // to kill the process
  process.exit(1);
});

winston.add(winston.transports.File, { filename: "logs/errors.log" });
// Database Log
winston.add(winston.transports.MongoDB, {
  db: "mongodb://localhost/vidly",
  level: "info"
});
// Example Un Caught Exceptions Sync
// throw new Error("Something Failed During StartUp..!");
// Asynchrouns UnhandledPromise
const p = Promise.reject(new Error("Async Somtheing Failed"));
p.then(() => console.log("Done"));

if (!config.get("jwtPrivateKey")) {
  console.error("jwtPrivateKey key is not defined");
  process.exit(1);
}
mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB..."));

app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);

app.use(error);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
