const mongoose = require("mongoose");
mongoose.set("debug", false);
const express = require("express");
const router = express.Router();
const Joi = require("joi");

const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50
    },
    isGold: {
      type: Boolean,
      required: true
    },
    phone: {
      type: Number,
      required: true
    }
  })
);

router.get("/", async (req, res) => {
  const customers = await Customer.find().sort("name");
  res.send(customers);
});

router.post("/", async (req, res) => {
  const { error } = validateCustomer(req.body);
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
  const { error } = validateCustomer(req.body);
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

function validateCustomer(cutomer) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required(),
    isGold: Joi.required(),
    phone: Joi.required()
  };
  return Joi.validate(cutomer, schema);
}

module.exports = router;
