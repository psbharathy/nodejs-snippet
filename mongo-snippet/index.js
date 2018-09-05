const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/playgorund")
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.log("Could not connect to MongoDB", err.message));

const courseSchema = new mongoose.Schema.apply({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean
});
