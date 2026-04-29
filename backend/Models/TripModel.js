const { tripSchema } = require("../schemas/TripSchema");
const { model } = require("mongoose");

const tripModel = model("Trip", tripSchema);

module.exports = { tripModel };
