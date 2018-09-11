const Joi = require("joi");
const mongoose = require("mongoose");

const { genreSchema } = require("./genre");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
    min: 0,
    max: 255
  },
  genre: {
    type: genreSchema,
    required: true
  },
  numberInStock: {
    type: Number,
    required: true
  },
  dailyRentalRate: {
    type: Number,
    required: true
  }
});

const Movie = mongoose.model("Movies", movieSchema);

function validateMovie(movie) {
  const schema = {
    title: Joi.string()
      .min(5)
      .max(50)
      .required(),
    numberInStock: Joi.number().required(),
    dailyRentalRate: Joi.number().required()
  };
  return Joi.validate(schema, movie);
}
exports.Movie = Movie;
exports.movieSchema = movieSchema;
exports.validate = validateMovie;
