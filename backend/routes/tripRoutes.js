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
        const { Location, noOfDays, budget, traveler, userEmail } = req.body;

        // Basic validation
        if (!Location || !noOfDays || !budget || !traveler || !userEmail) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const tripPlan = await aiService.generateTrip({ Location, noOfDays, budget, traveler });

        // --- NEW: Save the trip to MongoDB ---
        const newTrip = new Trip({
            userEmail: userEmail,
            location: Location,
            noOfDays: noOfDays,
            budget: budget,
            traveler: traveler,
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

/**
 * GET /api/get-trip/:id
 */
router.get('/get-trip/:id', async (req, res) => {
    try {
        const trip = await Trip.findById(req.params.id);
        if (!trip) {
            return res.status(404).json({ error: 'Trip not found' });
        }
        res.json(trip);
    } catch (error) {
        console.error('Fetch error:', error.message);
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;
