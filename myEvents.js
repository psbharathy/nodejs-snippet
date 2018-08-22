// Class

// // ES6 fromating
// emitter.on("msgWithArg", arg => {
//   console.log("Listener called", arg);
// });

const Logger = require("./logger");
const logger = new Logger();

// Listners is a fun it will called when msg log raised
logger.on("messageLogged", function() {
  console.log("Listener called");
});

logger.on("msgWithArg", function(arg) {
  console.log("Listener called", arg);
});
logger.log("message");
