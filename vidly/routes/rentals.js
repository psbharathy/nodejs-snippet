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
  if (error)
    return res.status(400).status("Invalid Rental", error.details[0].message);

  let rental = new Rental({
    dateOut: req.body.dateOut,
    dateReturned: req.body.dateReturned,
    rentalFee: req.body.rentalFee
  });
  rental = await rental.save();
  res.send(rental);
});

module.exports = router;
