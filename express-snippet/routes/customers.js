const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { Customer, validate } = require("../models/customer");
router.get("/", async (req, res) => {
  const customers = await Customer.find().sort("name");
  res.send(customers);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    let customer = new Customer({
      name: req.body.name,
      isGold: req.body.isGold,
      phone: req.body.phone
    });
    customer = await customer.save();
    res.send(customer);
  } catch (ex) {
    return res.status(400).send(ex.message);
  }
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
      },
      { new: true }
    );
    if (!customer)
      return res.status(404).send(`Customer not found ${req.params.id}`);
    res.send(customer);
  } catch (ex) {
    return res.status(400).send(ex.message);
  }
});

router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer)
    return res.status(404).send(`Customer not found ${req.params.id}`);
  res.send(customer);
});

router.delete("/:id", async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);
  if (!customer)
    return res.status(404).send(`Customer not found ${req.params.id}`);
  res.send(customer);
});

module.exports = router;
