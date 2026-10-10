const router=require('express').Router();
const auth = require('../middlewares/authMiddleware');
const { addMetrics, getMetrics } = require('../controllers/metricsController');

router.post('/add', auth, addMetrics);
router.get('/all', auth, getMetrics);

module.exports = router;