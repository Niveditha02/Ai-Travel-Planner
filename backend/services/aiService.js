const axios = require('axios');
require('dotenv').config();

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

const extractJson = (text) => {
    if (typeof text !== 'string') {
        return text;
    }

    const cleaned = text
        .replace(/```json/gi, '')
        .replace(/```/g, '')
        .trim();

    try {
        return JSON.parse(cleaned);
    } catch (_) {
        const start = cleaned.indexOf('{');
        const end = cleaned.lastIndexOf('}');
        if (start !== -1 && end !== -1 && end > start) {
            return JSON.parse(cleaned.slice(start, end + 1));
        }
        throw new Error('AI returned a travel plan that was not valid JSON');
    }
};

/**
 * Generates a travel itinerary using OpenRouter API (Llama 3.1 8b)
 * @param {Object} formData - { location, noOfDays, budget, traveler }
 * @returns {Promise<Object>} - The parsed trip plan
 */
const generateTrip = async (formData) => {
    const { Location, noOfDays, budget, traveler } = formData;

    if (!OPENROUTER_API_KEY) {
        throw new Error('OPENROUTER_API_KEY is not configured');
    }

    const prompt = `Generate a Travel Plan for Location: ${Location}, for ${noOfDays} Days for ${traveler} with a ${budget} budget.
    Return ONLY a valid JSON object using this exact structure, with no markdown, no conversational text, and no preamble:
    {
      "hotelOptions": [
        { "hotelName": "", "hotelAddress": "", "price": "", "hotelImageUrl": "", "geoCoordinates": "", "rating": "", "description": "" }
      ],
      "itinerary": [
        { "day": 1, "theme": "", "places": [
            { "placeName": "", "placeDetails": "", "placeImageUrl": "", "geoCoordinates": "", "ticketPricing": "", "rating": "", "timeToVisit": "" }
        ]}
      ]
    }`;

    try {
        const response = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                model: 'meta-llama/llama-3.1-8b-instruct',
                messages: [
                    {
                        role: 'user',
                        content: prompt
                    }
                ]
            },
            {
                headers: {
                    'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                    'HTTP-Referer': 'https://ai-travel-planner.local', // Required by OpenRouter
                    'X-Title': 'AI Travel Planner',
                    'Content-Type': 'application/json'
                }
            }
        );

        if (response.data && response.data.choices && response.data.choices[0]) {
            return extractJson(response.data.choices[0].message.content);
        } else {
            throw new Error('Unexpected response format from OpenRouter');
        }
    } catch (error) {
        const errorData = error.response ? error.response.data : error.message;
        console.error('OpenRouter API Error:', JSON.stringify(errorData, null, 2));
        
        // Pass the actual error message from OpenRouter if available
        let errorMessage = 'Failed to generate trip plan';
        if (error.response && error.response.data && error.response.data.error) {
            errorMessage = error.response.data.error.message || errorMessage;
        } else if (error.message) {
            errorMessage = error.message;
        }
        
        throw new Error(errorMessage);
    }
};

module.exports = {
    generateTrip
};
