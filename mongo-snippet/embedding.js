const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB...", err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model("Author", authorSchema);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    authors: [authorSchema]
  })
);

async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

async function updateCourse(courseId) {
  const course = await Course.findByIdAndUpdate(
    { _id: courseId },
    {
      $unset: {
        author: ""
      }
    }
  );
}

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
  console.log("Author added to course ...");
}

addAuthor("5b974ada15341c1fbcf9bd38", new Author({ name: "Deekshi" }));
// createCourse("Node Course", [
//   new Author({ name: "Bharaty" }),
//   new Author({ name: "PSB" })
// ]);

// updateCourse("5b961ded10639f2780b7984f");
