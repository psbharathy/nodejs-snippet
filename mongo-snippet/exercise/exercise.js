const mongoose = require("mongoose");
// Connecting to MongoDB
mongoose
  .connect("mongodb://localhost/mongo-exercises")
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.log("Could not connect to MongoDB", err.message));

// Creating a schema

const courseSchema = mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: Number
});

// Save to DB
const Course = mongoose.model("Course", courseSchema);

// Fetch from DB
async function getCourses() {
  return await Course.find({
    isPublished: true
  })
    .or([{ price: { $gte: 15 } }, { name: /.*by.*/i }])
    .sort({ price: -1 })
    .select("name author price");
}
async function run() {
  const courses = await getCourses();
  console.log(courses);
}
run();
