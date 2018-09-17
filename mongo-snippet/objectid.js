const mongoose = require("mongoose");

const id = new mongoose.Types.ObjectId();
console.log(id);
console.log(id.getTimestamp());
const isValid = new mongoose.Types.ObjectId.isValid("2344");
console.log(isValid);
// _id: 5b9f4c44af591528fa2d3a5d

//  It contains 12 Bytes

// 4 bytes: timestamp
// 3 bytes: maching identifier
// 2 bytes: process identifier
// 3 bytes: counter

// 1 byte = 8 bits each bit 0 or 1
