const mongoose = require("mongoose");
const Joi = require("joi");
const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50
    },
    isGold: {
      type: Boolean,
      required: true
    },
    phone: {
      type: Number,
      required: true
    }
  })
);

function validateCustomer(cutomer) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required(),
    phone: Joi.string()
      .required()
      .min(5)
      .max(12),
    isGold: Joi.boolean().required()
  };
  return Joi.validate(cutomer, schema);
}

module.exports.Customer = Customer;
exports.validate = validateCustomer;
