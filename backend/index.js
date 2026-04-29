
const express = require('express'); //backend framework (your server brain)
const cors = require('cors'); //allows frontend (like react) to talk to backend
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const tripRoutes = require('./routes/tripRoutes');

//instances
const app = express();//your server instance
const PORT = process.env.PORT || 3002;
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

app.use('/api', tripRoutes);//All routes inside tripRoutes will start with /api

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