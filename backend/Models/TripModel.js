const { model } = require("mongoose");

const { tripSchema } = require("../schemas/TripSchema");

const tripModel = new model("Trip", tripSchema);

module.exports = { tripModel };