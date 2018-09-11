const { Rental, validate } = require("../models/rental");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const rentals = await Rental.find();
  res.send(rentals);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  console.log(error.details[0].message);
  if (error) return res.status(400).status(error.details[0].message);

  // let rental = new Rental({
  //   dateOut: req.body.dateOut,
  //   dateReturned: req.body.dateReturned,
  //   rentalFee: req.body.rentalFee
  // });
  // rental = await rental.save();
  res.send({ name: "sss" });
});

module.exports = router;
