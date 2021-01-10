// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const NoteSchema = new Schema({
//   title: String,
//   body: String
// });

// const Note = mongoose.model("Note", NoteSchema);

// module.exports = Note;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const WorkoutSchema = new Schema(
  {
    day: { type: Date, default: () => Date() },
    exercises: [
      {
        type: {
          type: String,
          trim: true,
          required: "Enter an exercise type",
        },
        name: {
          type: String,
          trim: true,
          required: "Enter exercise name",
        },
        duration: {
          type: Number,
          required: "Enter exercise duration in minutes",
        },
        weight: {
          type: Number,
        },
        reps: {
          type: Number,
        },
        sets: {
          type: Number,
        },
        distance: {
          type: Number,
        },
      },
    ],
  },
  { toJSON: { virtuals: true } }
);
WorkoutSchema.virtual("totalDuration").get(function () {
  return this.exercises.reduce((totalDuration, exercise) => {
    return totalDuration + exercise.duration;
  }, 0);
});

const Workout = mongoose.model("Workout", WorkoutSchema);
module.exports = Workout;
