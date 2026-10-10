const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const sanitizeUser = (user) => ({
    _id: user._id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
});

// regiseter user
exports.register = async (req, res) => {
    try{
    const { name, email, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

    // Create new user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });
    res.status(201).json(sanitizeUser(user));
    } catch (err) {
        res.status(500).json(err.message);
    }
};

// login user
exports.login = async (req, res) => {
    try{
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "user not found" });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
  { id: user._id },
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);

    res.json({ token, user: sanitizeUser(user) });
    } catch (err) {
        res.status(500).json(err.message);
    }
};
