const Workout = require('../models/Workout');
// add a new workout
exports.addWorkout = async (req, res) => {
  try {
    const workout = await Workout.create({
        userId: req.user,
        ...req.body
    });
    res.json(workout);
  } catch (err) {
    res.status(500).json(err.message);
  }
    };

// get all workouts for a user
exports.getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ userId: req.user }).sort({ date: -1 });
    res.json(workouts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  } };