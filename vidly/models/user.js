const Joi = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});
const User = mongoose.model("Users", userSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required()
  };
  return Joi.validate(user, schema);
}

exports.validate = validateUser;
exports.userSchema = userSchema;
exports.User = User;
