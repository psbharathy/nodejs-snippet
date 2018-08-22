// Class
const EventEmitter = require("events");

const emitter = new EventEmitter();

// Listners is a fun it will called when msg log raised
emitter.on("messageLogged", function() {
  console.log("Listener called");
});

// Register Event
// event and Listenet Order is impartant
// emit means make an NOise or singaling
emitter.emit("messageLogged");
