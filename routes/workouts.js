const express = require("express");
const Workout = require("../models/Workout");
const router = express.Router();

// Create a new workout (POST)
router.post("/", async (req, res) => {
    try {
        const workout = new Workout(req.body);
        await workout.save();
        res.status(201).json(workout);
    } catch (err) {
        res.status(400).json({ error: "Validation failed: " + err.message });
    }
});

// Get all workouts (GET)
router.get("/", async (req, res) => {
    try {
        const workouts = await Workout.find();
        res.json(workouts);
    } catch (err) {
        res.status(500).json({ error: "Something went wrong" });
    }
});


router.get("/:id", async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.id);
        if (!workout) return res.status(404).json({ error: "Workout not found" });
        res.json(workout);
    } catch (err) {
        res.status(500).json({ error: "Something went wrong" });
    }
});


router.put("/:id", async (req, res) => {
    try {
        const workout = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!workout) return res.status(404).json({ error: "Workout not found" });
        res.json(workout);
    } catch (err) {
        res.status(500).json({ error: "Something went wrong" });
    }
});


router.delete("/:id", async (req, res) => {
    try {
        const workout = await Workout.findByIdAndDelete(req.params.id);
        if (!workout) return res.status(404).json({ error: "Workout not found" });
        res.json({ message: "Workout deleted" });
    } catch (err) {
        res.status(500).json({ error: "Something went wrong" });
    }
});

module.exports = router;
