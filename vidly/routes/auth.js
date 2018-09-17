const Joi = require("joi");
const _ = require("lodash");
const { User } = require("../models/user");
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

router.get("/me", async (req, res) => {
  const user = await User.find().sort("name");
  res.send(user);
});

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send(" Invalid email / password");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(400).send(" Invalid email / password");
    res.send(true);
  } catch (ex) {
    res.send(ex);
  }
});

function validate(req) {
  const schema = {
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required()
  };
  return Joi.validate(req, schema);
}

module.exports = router;
