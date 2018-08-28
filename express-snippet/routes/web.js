const express = require("express");
const router = express.Router();
// app.set("view engine", "pug");
// optional
// app.set("views", "./views");
router.get("/", (req, res) => {
  res.render("index", {
    title: "This is NodeJs",
    message: "Hello World !"
  });
  res.send("Hello World !!!");
});

module.exports = router;
