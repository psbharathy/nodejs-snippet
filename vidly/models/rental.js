const mongoose = require("mongoose");
const Joi = require("joi");

const rentalSchema = new mongoose.Schema({
  dateOut: {
    type: Date,
    required: true,
    default: Date.now
  },
  dateReturned: {
    type: Date,
    required: true
  },
  rentalfee: {
    type: Number,
    min: 0
  }
});

const Rental = mongoose.model("Rental", rentalSchema);

function validateRental(rental) {
  const schema = {
    dateOut: Joi.date().required(),
    dateReturned: Joi.date().required(),
    rentalfee: Joi.number()
  };
  return Joi.validate(schema, rental);
}

module.exports.Rental = Rental;
module.exports.rentalSchema = rentalSchema;
exports.validate = validateRental;
