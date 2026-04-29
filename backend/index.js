
const express = require('express'); //backend framework (your server brain)
const cors = require('cors'); //allows frontend (like react) to talk to backend
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const aiService = require('./services/aiService');
const Trip = require('./schemas/TripSchema');
const tripRoutes = require('./routes/tripRoutes');

//instances
const app = express();//your server instance
const PORT = process.env.PORT || 10000;
const uri = process.env.MONGO_URL;

app.use(cors());//allows requests from frontend
app.use(express.json());//lets server read JSON from request body

// Health check route
app.get('/api/health', (req, res) => {
    res.json({ 
        message: 'AI Travel Planner API is online',
        database: mongoose.connection.readyState === 1 ? 'connected' : 'connecting/disconnected'
    });
});

// THE MAIN GENERATION ROUTE (Directly in index.js for absolute reliability)
app.post('/api/generate-trip', async (req, res) => {
    console.log('📥 POST /api/generate-trip called');
    try {
        const { Location, noOfDays, budget, traveler, userEmail } = req.body;
        if (!Location || !noOfDays || !budget || !traveler || !userEmail) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        
        const tripPlan = await aiService.generateTrip({ Location, noOfDays, budget, traveler });
        const newTrip = new Trip({
            userEmail,
            location: Location,
            noOfDays,
            budget,
            traveler,
            tripPlan
        });
        await newTrip.save();
        
        res.json({ result: tripPlan, tripId: newTrip._id });
    } catch (error) {
        console.error('❌ Generation error:', error);
        res.status(500).json({ error: error.message });
    }
});

app.use('/api', tripRoutes);

//just health checkup is server alive 
app.get('/', (req, res) => {
    res.send('AI Travel Planner API is running...');
});

// Start server immediately
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Connect to MongoDB in the background
mongoose.connect(uri)
    .then(() => {
        console.log('MongoDB Atlas connected successfully!');
    })
    .catch((err) => {
        console.error('MongoDB Connection Error:', err);
    });
// mongoose.connect(uri)
//     .then(() => {
//         console.log('MongoDB Atlas connected successfully!');
//         // Boots up your server continuously waiting for requests
//         app.listen(PORT, () => {
//             console.log(`Server is running on http://localhost:${PORT}`);
//         });
//     })
//     .catch((err) => {
//         console.error('MongoDB Connection Error:', err);
//     });