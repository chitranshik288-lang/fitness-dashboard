const express = require('express'); 
const mongoose = require('mongoose');   
const cors = require('cors');
require('dotenv').config();  // .config() to load & read environment variables from .env file

const app = express();

// Middleware
app.use(express.json());  // To parse JSON bodies
app.use(cors()); // Enable CORS for all routes


app.get('/', (req, res) => {
    res.send("api is running");
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI) // Use the MONGO_URI from environment variables
.then(() => console.log('Connected to MongoDB')) 
.catch(err => console.log('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000; // Use PORT from environment variables or default to 5000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes); // Use auth routes with prefix /api/auth

const workoutRoutes = require('./routes/workoutRoutes');
app.use('/api/workouts', workoutRoutes); // Use workout routes with prefix /api/workouts

const metricsRoutes = require('./routes/metricsRoutes');
app.use('/api/metrics', metricsRoutes); // Use metrics routes with prefix /api/metrics

const analyticsRoutes = require('./routes/analyticsRoutes');
app.use('/api/analytics', analyticsRoutes); // Use analytics routes with prefix /api/analytics