const express = require('express');
const router = express.Router();
const aiService = require('../services/aiService');
const Trip = require('../schemas/TripSchema');

/**
 * POST /api/generate-trip
 * Expects { Location, noOfDays, budget, traveler } in body
 */
router.post('/generate-trip', async (req, res) => {
    try {
        const formData = req.body;

        // Basic validation
        if (!formData.Location || !formData.noOfDays || !formData.budget || !formData.traveler) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const tripPlan = await aiService.generateTrip(formData);

        // --- NEW: Save the trip to passing to MongoDB ---
        const newTrip = new Trip({
            location: formData.Location,
            noOfDays: formData.noOfDays,
            budget: formData.budget,
            traveler: formData.traveler,
            tripPlan: tripPlan
        });
        await newTrip.save();

        // Return JSON back to the frontend, including the Database ID we just created
        res.json({ result: tripPlan, tripId: newTrip._id });
    } catch (error) {
        console.error('Route error:', error.message);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
