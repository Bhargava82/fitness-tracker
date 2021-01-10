const router = require("express").Router();
const db = require("../models");
router.get("/api/config", (req, res) => {
  res.json({
    success: true,
  });
});
router.get("/api/workouts", (req, res) => {
  db.Workout.find()
    .then((foundWorkouts) => {
      res.json(foundWorkouts);
    })
    .catch((err) => {
      res.json(err);
    });
});
// router.get("/api/workouts/:id", (req, res) => {
//   db.Workout.findById(req.params.id)
//     .then((foundWorkout) => {
//       res.json(foundWorkout);
//     })
//     .catch((err) => {
//       res.json(err);
//     });
// });
router.post("/api/workouts", (req, res) => {
  db.Workout.create(req.body)
    .then((newWorkout) => {
      res.json(newWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});
router.put("/api/workouts/:id", ({ body, params }, res) => {
  db.Workout.findByIdAndUpdate(
    params.id,
    { $push: { exercises: body } },
    // “runValidators” will ensure new exercises meet our schema requirements
    { new: true, runValidators: true }
  )
    .then((updateWorkout) => {
      res.json(updateWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});
router.get("/api/workouts/range", (req, res) => {
  db.Workout.find()
    .limit(7)
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});
module.exports = router;
