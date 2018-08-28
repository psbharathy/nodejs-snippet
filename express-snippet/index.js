const startDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");

const logger = require("./middleware/logger");

const config = require("config");
const Joi = require("joi");
const express = require("express");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");

// This is a middleware priec
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
console.log(app.get("env"));

console.log(config.get("name"));
console.log(config.get("mail.host"));

console.log("App Mail Password : " + config.get("mail.password"));
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  startDebugger("Morgan enbaled");
  dbDebugger("Database debug enbaled");
}

app.use(logger);
// process is global module

// Creating Custom Middleware

const categories = [
  { id: 1, name: "Book" },
  { id: 2, name: "Art" },
  { id: 3, name: "Computer" }
];

app.get("/", (req, res) => {
  res.send("Hello World !!!");
});

app.get("/api/categories", (req, res) => {
  res.send(categories);
});

app.put("/api/categories/:id", (req, res) => {
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

app.post("/api/categories", (req, res) => {
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

app.get("/api/categories/:id", (req, res) => {
  const category = categories.find(c => c.id === parseInt(req.params.id));
  if (!category)
    return res.status(404).send(`the Category not found ${req.params.id}`);
  res.send(category);
});

app.delete("/api/categories/:id", (req, res) => {
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

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on Port ${port}...`));
