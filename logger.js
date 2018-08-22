const EventEmitter = require("events");

var url = "http://mylooger.io/log";

class Logger extends EventEmitter {
  log(message) {
    //
    console.log(message);

    // Register Event
    // event and Listenet Order is impartant
    // emit means make an NOise or singaling
    this.emit("messageLogged");
    // Rasise Event
    this.emit("msgWithArg", { id: 1, url: "http://emit/" });
  }
}

module.exports = Logger;
