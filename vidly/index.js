const config = require("config");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const express = require("express");
const app = express();

require("./startup/loging")();
require("./startup/routes")(app);
require("./startup/db")();

// Example Un Caught Exceptions Sync
// throw new Error("Something Failed During StartUp..!");
// Asynchrouns UnhandledPromise
// const p = Promise.reject(new Error("Async Somtheing Failed"));
// p.then(() => console.log("Done"));

if (!config.get("jwtPrivateKey")) {
  console.error("jwtPrivateKey key is not defined");
  process.exit(1);
}
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
