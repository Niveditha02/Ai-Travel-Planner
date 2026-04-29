const express = require('express');
const router = express.Router();
const aiService = require('../services/aiService');
const Trip = require('../schemas/TripSchema');

/**
 * POST /api/generate-trip
 * Expects { Location, noOfDays, budget, traveler } in body
 */
const handleGenerateTrip = async ({ Location, noOfDays, budget, traveler, userEmail }) => {
    const tripPlan = await aiService.generateTrip({ Location, noOfDays, budget, traveler });
    const newTrip = new Trip({
        userEmail: userEmail,
        location: Location,
        noOfDays: noOfDays,
        budget: budget,
        traveler: traveler,
        tripPlan: tripPlan
    });
    await newTrip.save();
    return { result: tripPlan, tripId: newTrip._id };
};

router.post('/generate-trip', async (req, res) => {
    try {
        const result = await handleGenerateTrip(req.body);
        res.json(result);
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


router.handleGenerateTrip = handleGenerateTrip;
module.exports = router;
