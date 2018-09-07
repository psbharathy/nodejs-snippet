const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/playgorund")
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.log("Could not connect to MongoDB", err.message));

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true }, // this is only used in mongoose
  author: String,
  // Custom Validator
  tags: {
    type: String,
    validate: {
      // Async Validator with callback
      isAsync: true,
      validator: function(v, callback) {
        setTimeout(() => {
          const result = v && v.length > 0;
          callback(result);
        }, 4000);
      },
      message: "A course should have at least one tag"
    }
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  category: {
    type: String,
    required: true,
    enum: ["web", "mobile", "network"]
  },
  price: {
    type: Number,
    required: function() {
      return this.isPublished;
    }
  }
});

// Aditional Validator {minlength:5, maxlength:255, enum:[cat, cat2]}

// Creating a Mongo DB Model
const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "NodeJs Validation Course",
    author: "PSB",
    tags: null,
    isPublished: true,
    category: "webs",
    price: 20
  });
  try {
    const result = await course.save();
    console.log(result);
  } catch (ex) {
    for (field in ex.errors) {
      console.log(ex.errors[field].message);
    }
  }
}

// eq = equal ne = not equal like gt, gte, lt, lte, in, nin (not in)

//  Comparison query Opterators
// .find({'price': {$gte: 10, $lte: 20 }})
// .find({'price':{$in:[10,20,30]}})

//  Logical query Opterators => or, and
// .find().or([{author:''Mosh'},{isPublished: ture}])
// .find().and([{author:''Mosh'},{isPublished: ture}])

// Regular Experssions
// ^ is represents string starts with
// .find({author: /^PS/})
// Ends with  $ = string ends with
// .find({author: /B$/})
// to make case insenstive add /i to pattern /^PS/i

// Authors contains word ps
// .find({author: /.*PS.*/})

async function getCourses() {
  const pageNumber = 1;
  const pageSize = 1;

  const courses = await Course.find({ author: "PSB", isPublished: true })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ name: 1 }) // 1 indicates ascending -1 = descending
    .count();
  console.log(courses);
}

// getCourses();
createCourse();
