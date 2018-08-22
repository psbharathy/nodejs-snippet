// Regulrar Javascript
// Loding looger module
var log = require("./logger");
const path = require("path");
const os = require("os");

const fs = require("fs");

// HTTP class
const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url == "/") {
    res.write("Hello World");
    res.end();
    console.log("Port Listned");
  }

  if (req.url == "/api/node") {
    res.write(JSON.stringify([1, 2, 3, 4, 5]));
    res.end();
  }
});
server.listen(3000);

console.log("Listening the port 3000");
