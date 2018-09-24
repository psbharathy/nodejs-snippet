const express = require("express");
const router = express.Router();
const { Returns, validate } = require("../models/returns");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  console.log(req.body);
  res.status(401).send(req.body);
});

module.exports = router;
