const { Rental } = require("../models/rental");
const { Movie } = require("../models/movie");

const auth = require("../middleware/auth");
const moment = require("moment");
const express = require("express");
const router = express.Router();
// const { Returns, validate } = require("../models/returns");

router.post("/", auth, async (req, res) => {
  // const { error } = validate(req.body);
  if (!req.body.customerId) return res.status(400).send("Invalid Customer Id");
  if (!req.body.movieId) return res.status(400).send("Invalid Movie Id");

  const rental = await Rental.findOne({
    "customer._id": req.body.customerId,
    "movie._id": req.body.movieId
  });
  if (!rental) return res.status(404).send("Rental Not found");

  if (rental.dateReturned)
    return res.status(400).send("Return is already processed");

  rental.dateReturned = new Date();
  const rentalDays = moment().diff(rental.datOut, "days");
  rental.rentalFee = rentalDays * rental.movie.dailyRentalRate;
  await rental.save();

  await Movie.update(
    { _id: rental.movie._id },
    {
      $inc: { numberInStock: 1 }
    }
  );

  return res.status(200).send("Valid Return");
});

module.exports = router;
