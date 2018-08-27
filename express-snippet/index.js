const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World !!!");
});

app.get("/api/category", (req, res) => {
  res.send(["Air", "Books", "Cartoon"]);
});

app.get("/api/category/:id", (req, res) => {
  res.send(req.params.id);
});

app.get("/api/items/:year/:month", (req, res) => {
  res.send(req.query);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on Port ${port}...`));
