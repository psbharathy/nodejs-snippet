const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/playgorund")
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.log("Could not connect to MongoDB", err.message));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean
});

// Creating a Mongo DB Model
const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Angular Course",
    author: "PSB",
    tags: ["Angular", "frontend"],
    isPublished: true
  });
  const result = await course.save();
  console.log(result);
}

// eq = equal ne = not equal like gt, gte, lt, lte, in, nin (not in)

//  Comparison Opterators
// .find({'price': {$gte: 10, $lte: 20 }})
// .find({'price':{$in:[10,20,30]}})

async function getCourses() {
  const courses = await Course.find({ author: "PSB", isPublished: true })
    .limit(2)
    .sort({ name: 1 }) // 1 indicates ascending -1 = descending
    .select({ name: 1, tags: 1 });
  console.log(courses);
}

getCourses();
// createCourse();
