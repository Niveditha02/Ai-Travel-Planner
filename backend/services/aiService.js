const axios = require('axios');
require('dotenv').config();

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

/**
 * Generates a travel itinerary using OpenRouter API (Llama 3.1 8b)
 * @param {Object} formData - { location, noOfDays, budget, traveler }
 * @returns {Promise<string>} - The AI response text
 */
const generateTrip = async (formData) => {
    const { Location, noOfDays, budget, traveler } = formData;

    const prompt = `Generate Travel Plan for Location: ${Location}, for ${noOfDays} Days for ${traveler} with a ${budget} budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placename, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for ${noOfDays} days with each day plan with best time to visit in JSON format.`;

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
            return response.data.choices[0].message.content;
        } else {
            throw new Error('Unexpected response format from OpenRouter');
        }
    } catch (error) {
        console.error('OpenRouter API Error:', error.response ? error.response.data : error.message);
        throw new Error('Failed to generate trip plan');
    }
};

module.exports = {
    generateTrip
};
