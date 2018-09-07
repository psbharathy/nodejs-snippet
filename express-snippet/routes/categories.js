const mongoose = require("mongoose");
mongoose.set("debug", false);
const express = require("express");
const router = express.Router();
const Joi = require("joi");

const Category = mongoose.model(
  "Category",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50
    }
  })
);

router.get("/", async (req, res) => {
  const categories = await Category.find().sort("name");
  res.send(categories);
});

router.post("/", async (req, res) => {
  // validate the course
  // Object Destrurting {error}
  const { error } = validateCatrgory(req.body); // result.error
  if (error) return res.status(400).send(error.details[0].message);
  try {
    let category = new Category({ name: req.body.name });
    category = await category.save();
    res.send(category);
  } catch (ex) {
    return res.status(400).send(ex.message);
  }
});

router.put("/:id", async (req, res) => {
  // Object Destrurting {error}
  const { error } = validateCatrgory(req.body); // result.error
  if (error) return res.status(400).send(error.details[0].message);

  // Look up the course
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  if (!category)
    return res.status(404).send(`the Category not found ${req.params.id}`);

  res.send(category);
});

router.delete("/:id", async (req, res) => {
  const category = await Category.findByIdAndRemove(req.params.id);
  if (!category)
    return res.status(404).send(`the Category not found ${req.params.id}`);
  res.send(category);
});

router.get("/:id", async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category)
    return res.status(404).send(`the Category not found ${req.params.id}`);
  res.send(category);
});

function validateCatrgory(course) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(course, schema);
}

module.exports = router;
