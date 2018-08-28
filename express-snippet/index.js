const Joi = require("joi");
const express = require("express");
const app = express();

// This is a middleware priec
app.use(express.json());

const categories = [
  { id: 1, name: "Book" },
  { id: 2, name: "Art" },
  { id: 3, name: "Computer" }
];

app.get("/", (req, res) => {
  res.send("Hello World !!!");
});

app.get("/api/categories", (req, res) => {
  res.send(["Air", "Books", "Cartoon"]);
});

app.post("/api/categories", (req, res) => {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  const result = Joi.validate(req.body, schema);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  const category = {
    id: categories.length + 1,
    name: req.body.name
  };
  categories.push(category);
  res.send(category);
});
app.get("/api/categories/:id", (req, res) => {
  const category = categories.find(c => c.id === parseInt(req.params.id));
  if (!category)
    res.status(404).send(`the Category not found ${req.params.id}`);
  res.send(category);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on Port ${port}...`));
