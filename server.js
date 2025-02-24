const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const workoutRoutes = require("./routes/workoutRoutes.js"); // Import routes

const app = express(); // Initialize Express

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/workouts", workoutRoutes);  // This line must come AFTER `app` is initialized

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT || 8080, () => {
        console.log(`Server is running on port ${process.env.PORT || 8080}`);
    });
}).catch(err => console.log(err));
