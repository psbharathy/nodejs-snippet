const Joi = require("joi");
const mongoose = require("mongoose");

const returnsSchema = new mongoose.Schema({});

const Returns = mongoose.model("returns", returnsSchema);

function validate(returns) {
  const schema = {
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required()
  };
  return Joi.validate(returns, schema);
}

exports.Returns = Returns;
exports.validate = validate;
