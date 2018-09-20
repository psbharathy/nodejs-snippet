require("express-async-errors");
const winston = require("winston");
require("winston-mongodb");

module.exports = function() {
  winston.handleExceptions(
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
