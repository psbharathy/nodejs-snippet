module.exports = function(req, res, next) {
  // Logging Exception
  res.status(500).send("Something failed!");
};
