const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", {
    title: "This is NodeJs",
    message: "Hello World !"
  });
  res.send("Hello World !!!");
});

module.exports = router;
