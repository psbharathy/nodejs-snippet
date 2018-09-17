const { User, validate } = require("../models/user");
const express = require("express");
const router = express.Router();

router.get("/me", async (req, res) => {
  const user = await User.find().sort("name");
  res.send(user);
});

router.post("/", async (req, res) => {
  const error = await validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
});

module.exports = router;
