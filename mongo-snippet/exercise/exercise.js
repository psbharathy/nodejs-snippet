const mongoose = require("mongoose");
mongoose.set("debug", false);
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

async function updateCourse(id) {
  const course = await Course.findOneAndUpdate(
    id,
    { author: "Adam Dave", isPublished: false },
    function(err, data) {
      if (!err) console.log(data);
    }
  );
  return true;
}

async function removeCourse(id) {
  const result = await Course.findOneAndRemove({ _id: id }, function(
    err,
    data
  ) {
    // if (!err) console.log(data);
  });
  console.log("result", result);
}

// updateCourse("5a68fdc3615eda645bc6bdec");

// removeCourse("5a68fde3f09ad7646ddec17e");

async function run() {
  // const courses = await getCourses();
  try {
    return await removeCourse("5a68fde3f09ad7646ddec17e");
  } catch (error) {
    console.log("Error", error.message);
  }
}
run();
