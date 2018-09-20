module.exports = function(req, res, next) {
  //401 Unauthroized
  // 403 Forbidden
  console.log(req.user);
  if (!req.user.isAdmin) return res.status(403).send("Access denied");
  next();
};
