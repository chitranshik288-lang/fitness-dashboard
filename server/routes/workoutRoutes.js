const router = require('express').Router();
const auth = require('../middlewares/authMiddleware');
const { addWorkout, getWorkouts } = require('../controllers/workoutController');

router.post('/add', auth, addWorkout);
router.get('/all', auth, getWorkouts);

module.exports = router;