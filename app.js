// Regulrar Javascript
// Loding looger module
var log = require("./logger");
const path = require("path");
const os = require("os");

const fs = require("fs");
// Syncronus method
// const files = fs.readdirSync("./");
// log(`files :${files}`);

// Asyncrhouns
fs.readdir("./", function(err, files) {
  if (err) console.log("error", err);
  else log(`Result :${files}`);
});

/// Throw execeptions
// fs.readdir("$", function(err, files) {
//   if (err) console.log("error", err);
//   else log(`Result :${files}`);
// });

var totalMemory = os.totalmem();
var freeMemory = os.freemem();
log(`Total Memeory :${totalMemory}`);
log(`Free Memeory :${freeMemory}`);

// log(path.parse(__filename));
// log("I am Logger");
