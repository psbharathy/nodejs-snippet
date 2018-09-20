const { Rental, validate } = require("../models/rental");
const { Movie } = require("../models/movie");
const { Customer } = require("../models/customer");
const mongoose = require("mongoose");
const Fawn = require("fawn");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

Fawn.init(mongoose);
router.get("/", async (req, res) => {
  const rentals = await Rental.find().sort("-dateOut");
  res.send(rentals);
});

router.post("/", auth, async (req, res) => {
  // console.log(req.body);
  const { error } = validate(req.body);
  if (error) return res.status(400).status(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send("Invalid Customer");

  const movie = await Movie.findById(req.body.movieId);

  if (!movie) return res.status(400).send("Invalid Movie");

  if (!movie.numberInStock === 0)
    return res.status(400).send("Movie Stock Not available");
  const rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate
    }
  });
  // rental = await rental.save();
  // movie.numberInStock--;
  // movie.save();
  try {
    // MongoDB Transactions using Fawn package
    new Fawn.Task()
      .save("rentals", rental)
      .update(
        "movies",
        { _id: movie._id },
        {
          $inc: {
            numberInStock: -1
          }
        }
      )
      .run();
    res.send(rental);
  } catch (ex) {
    return res.status(500).send("Something Failed");
  }
});

module.exports = router;
