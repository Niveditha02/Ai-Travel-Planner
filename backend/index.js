
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
app.use('/api', tripRoutes);//All routes inside tripRoutes will start with /api

//just health checkup is server alive 
app.get('/', (req, res) => {
    res.send('AI Travel Planner API is running...');
});

//boots up you server, runs continuously waiting for your response
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    mongoose.connect(uri)
    console.log('DB connected');
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