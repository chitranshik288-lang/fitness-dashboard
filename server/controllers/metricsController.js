const Metrics = require('../models/metrics');
// add new metrics
exports.addMetrics = async (req, res) => {
  try {
    const metrics = await Metrics.create({
      userId: req.user,
      ...req.body
    });
    res.status(201).json(metrics);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// get all metrics for a user
exports.getMetrics = async (req, res) => {
  try {
    const data = await Metrics.find({ userId: req.user}).sort({date: -1});
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};