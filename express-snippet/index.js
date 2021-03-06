const startDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");

const logger = require("./middleware/logger");
const categories = require("./routes/categories");
const customers = require("./routes/customers");
const config = require("config");
const webRoutes = require("./routes/web");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");

// Connecting to MongoDB
mongoose
  .connect("mongodb://localhost/shoping-exercises")
  .then(() => console.log("Connected to Shoping..."))
  .catch(err => console.log("Could not connect to Shoping", err.message));

// This is a middleware piece
// app.use();
// Pug Package is for Template Engine

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(logger);
app.set("view engine", "pug");
// optional
app.set("views", "./views");
console.log(app.get("env"));
console.log(config.get("name"));
console.log(config.get("mail.host"));
// process is global module

// Creating Custom Middleware

// console.log("App Mail Password : " + config.get("mail.password"));
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  startDebugger("Morgan enbaled");
  dbDebugger("Database debug enbaled");
}

app.use("/", webRoutes);
// Categories Route
app.use("/api/categories", categories);
// Customers Route
app.use("/api/customers", customers);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on Port ${port}...`));
