const express = require('express');
const router = express.Router();
const aiService = require('../services/aiService');
const Trip = require('../schemas/TripSchema');

/**
 * POST /api/generate-trip
 * POST /api/generate-plan
 * Expects { Location, noOfDays, budget, traveler } in body
 */
const handleGenerateTrip = async ({ Location, noOfDays, budget, traveler, userEmail }) => {
    const requestFields = { Location, noOfDays, budget, traveler, userEmail };
    const missingFields = Object.entries(requestFields)
        .filter(([, value]) => value === undefined || value === null || value === '')
        .map(([field]) => field);

    if (missingFields.length > 0) {
        const error = new Error(`Missing required fields: ${missingFields.join(', ')}`);
        error.statusCode = 400;
        throw error;
    }

    const parsedDays = Number(noOfDays);
    if (!Number.isInteger(parsedDays) || parsedDays < 1 || parsedDays > 5) {
        const error = new Error('noOfDays must be a whole number between 1 and 5');
        error.statusCode = 400;
        throw error;
    }

    const normalizedTrip = {
        Location: String(Location).trim(),
        noOfDays: parsedDays,
        budget: String(budget).trim(),
        traveler: String(traveler).trim()
    };

    const tripPlan = await aiService.generateTrip(normalizedTrip);
    const newTrip = new Trip({
        userEmail: String(userEmail).trim(),
        location: normalizedTrip.Location,
        noOfDays: normalizedTrip.noOfDays,
        budget: normalizedTrip.budget,
        traveler: normalizedTrip.traveler,
        tripPlan
    });
    await newTrip.save();
    return { result: tripPlan, tripId: newTrip._id };
};

const generateTripRoute = async (req, res) => {
    try {
        const result = await handleGenerateTrip(req.body);
        res.json(result);
    } catch (error) {
        console.error('Route error:', error.message);
        res.status(error.statusCode || 500).json({ error: error.message });
    }
};

router.post('/generate-trip', generateTripRoute);
router.post('/generate-plan', generateTripRoute);

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
