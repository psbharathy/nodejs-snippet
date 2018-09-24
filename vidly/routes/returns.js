const Joi = require("joi");
const { Rental } = require("../models/rental");
const { Movie } = require("../models/movie");
const validate = require("../middleware/validate");
const auth = require("../middleware/auth");
const moment = require("moment");
const express = require("express");
const router = express.Router();

router.post("/", [auth, validate(validateReturn)], async (req, res) => {
  // in OOP
  // Static Method: Rental.lookup
  //    Dircly on a Class
  // Instance Method: new User().generateAuthToken();
  //    avaialable on an Object

  const rental = await Rental.lookup(req.body.customerId, req.body.movieId);
  if (!rental) return res.status(404).send("Rental Not found");

  if (rental.dateReturned)
    return res.status(400).send("Return is already processed");

  // Information Expert Principle
  rental.return();
  await rental.save();

  await Movie.update(
    { _id: rental.movie._id },
    {
      $inc: { numberInStock: 1 }
    }
  );

  return res.send(rental);
});

function validateReturn(returns) {
  const schema = {
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required()
  };
  return Joi.validate(returns, schema);
}

module.exports = router;
