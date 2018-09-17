const { User, validate } = require("../models/user");
const express = require("express");
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
    users = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });
    users = await users.save();

    res.send(users);
  } catch (ex) {
    res.send(ex);
  }
});

module.exports = router;
