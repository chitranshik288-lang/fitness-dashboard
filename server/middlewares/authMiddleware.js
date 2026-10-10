const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json("No token");
    }

    const token = authHeader.replace("Bearer", "").trim();
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded.id;

    next();
  } catch (err) {
    res.status(401).json(err.message);
  }
};
