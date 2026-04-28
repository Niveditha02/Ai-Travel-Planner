import axios from "axios";

const BACKEND = "http://localhost:5000/api";

export const generateTrip = async (formData) =>
    axios.post(`${BACKEND}/generate-trip`, formData);

export const getTrip = async (tripId) =>
    axios.get(`${BACKEND}/get-trip/${tripId}`);
