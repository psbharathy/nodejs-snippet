// Regulrar Javascript
// Loding looger module
var log = require("./logger");
const path = require("path");
const os = require("os");

const fs = require("fs");

// HTTP class
const http = require("http");
const server = http.createServer();
server.on("connection", socket => {
  console.log("New Connection");
});
server.listen(3000);
console.log("Listening on Port 3000...");

// Syncronus method
// const files = fs.readdirSync("./");
// log(`files :${files}`);

// Asyncrhouns
fs.readdir("./", function(err, files) {
  if (err) console.log("error", err);
  else console.log(`Result :${files}`);
});

/// Throw execeptions
// fs.readdir("$", function(err, files) {
//   if (err) console.log("error", err);
//   else log(`Result :${files}`);
// });

var totalMemory = os.totalmem();
var freeMemory = os.freemem();
console.log(`Total Memeory :${totalMemory}`);
console.log(`Free Memeory :${freeMemory}`);

// log(path.parse(__filename));
// log("I am Logger");
