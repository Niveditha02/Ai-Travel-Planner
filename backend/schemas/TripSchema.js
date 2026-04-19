const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    userEmail: { type: String, required: true },
    location: { type: String, required: true },
    noOfDays: { type: Number, required: true },
    budget: { type: String, required: true },
    traveler: { type: String, required: true },
    tripPlan: { type: mongoose.Schema.Types.Mixed }, // This can store either String or JSON Object
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Trip', tripSchema);//Here Trip is a collection name in MongoDB2
