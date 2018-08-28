const express = require("express");
const router = express.Router();
const Joi = require("joi");

const categories = [
  { id: 1, name: "Book" },
  { id: 2, name: "Art" },
  { id: 3, name: "Computer" }
];

router.get("/", (req, res) => {
  res.send(categories);
});

router.put("/:id", (req, res) => {
  // Look up the course
  // if not retrun 404
  const category = categories.find(c => c.id === parseInt(req.params.id));
  if (!category)
    return res.status(404).send(`the Category not found ${req.params.id}`);

  // validate the course
  // Object Destrurting {error}
  const { error } = validateCatrgory(req.body); // result.error
  if (error) return res.status(400).send(error.details[0].message);

  // update the coure
  category.name = req.body.name;
  res.send(category);

  // return updated course
});

router.post("/", (req, res) => {
  // validate the course
  // Object Destrurting {error}
  const { error } = validateCatrgory(req.body); // result.error
  if (error) return res.status(400).send(error.details[0].message);

  const category = {
    id: categories.length + 1,
    name: req.body.name
  };
  categories.push(category);
  res.send(category);
});

router.get("/:id", (req, res) => {
  const category = categories.find(c => c.id === parseInt(req.params.id));
  if (!category)
    return res.status(404).send(`the Category not found ${req.params.id}`);
  res.send(category);
});

router.delete("/:id", (req, res) => {
  const category = categories.find(c => c.id === parseInt(req.params.id));
  if (!category)
    return res.status(404).send(`the Category not found ${req.params.id}`);

  const index = categories.indexOf(category);
  categories.splice(index, 1);
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
