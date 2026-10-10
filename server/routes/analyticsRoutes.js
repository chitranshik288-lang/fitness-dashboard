const router = require("express").Router();
const auth= require("../middlewares/authMiddleware");

const { getWeightProcess, getStrengthProgress, getPlateau, getInights } = require("../controllers/analyticsController");

router.get("/weight", auth, getWeightProcess);
router.get("/strength", auth, getStrengthProgress);
router.get("/plateau", auth, getPlateau);
router.get("/insights", auth, getInights);

module.exports = router;