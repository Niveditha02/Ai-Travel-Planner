const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const tripRoutes = require('./routes/tripRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;
const uri = process.env.MONGO_URL;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
    res.json({
        message: 'AI Travel Planner API is online',
        database: mongoose.connection.readyState === 1 ? 'connected' : 'connecting/disconnected'
    });
});

app.use('/api', tripRoutes);
app.use('/', tripRoutes);

app.get('/', (req, res) => {
    res.send('AI Travel Planner API is running...');
});

app.use((req, res) => {
    res.status(404).json({
        error: `Cannot ${req.method} ${req.originalUrl}`,
        availableRoutes: [
            'GET /api/health',
            'POST /api/generate-trip',
            'GET /api/get-trip/:id'
        ]
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

if (!uri) {
    console.error('MONGO_URL is not configured');
} else {
    mongoose.connect(uri)
        .then(() => {
            console.log('MongoDB Atlas connected successfully!');
        })
        .catch((err) => {
            console.error('MongoDB Connection Error:', err);
        });
}
