require("express-async-errors");
const winston = require("winston");
require("winston-mongodb");

module.exports = function() {
  // Example Un Caught Exceptions Sync
  // throw new Error("Something Failed During StartUp..!");
  // Asynchrouns UnhandledPromise
  // const p = Promise.reject(new Error("Async Somtheing Failed"));
  // p.then(() => console.log("Done"));

  winston.handleExceptions(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: "logs/unCaughtErrors.log" })
  );
  // asynchrous code
  process.on("unhandledRejection", ex => {
    throw ex;
  });

  winston.add(winston.transports.File, { filename: "logs/errors.log" });
  // Database Log
  winston.add(winston.transports.MongoDB, {
    db: "mongodb://localhost/vidly",
    level: "info"
  });
};
