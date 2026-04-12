const express = require('express');
const router = express.Router();
const aiService = require('../services/aiService');

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
        
        // OpenRouter often returns markdown blocks, we might want to extract the JSON
        // but the prompt explicitly asks for JSON format.
        // We'll return the raw text for now and handle parsing in the frontend if needed.
        res.json({ result: tripPlan });
    } catch (error) {
        console.error('Route error:', error.message);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
