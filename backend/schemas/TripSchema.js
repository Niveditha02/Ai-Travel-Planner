const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    userEmail: { type: String, required: true },
    location: { type: String, required: true },
    noOfDays: { type: Number, required: true },
    budget: { type: String, required: true },
    traveler: { type: String, required: true },
    tripPlan: { type: mongoose.Schema.Types.Mixed },
    createdAt: { type: Date, default: Date.now }
});

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;
module.exports.tripSchema = tripSchema;
