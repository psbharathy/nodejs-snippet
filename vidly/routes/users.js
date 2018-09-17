const { User, validate } = require("../models/user");
const express = require("express");
const _ = require("lodash");
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
    if (user) return res.status(400).send("User Already Registered");
    user = new User(_.pick(req.body, ["name", "email", "password"]));
    await user.save();

    res.send(_.pick(user, ["name", "email"]));
  } catch (ex) {
    res.send(ex);
  }
});

module.exports = router;
