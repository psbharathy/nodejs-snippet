// Regulrar Javascript
// Loding looger module
var log = require("./logger");
const path = require("path");
log(path.parse(__filename));
log("I am Logger");
