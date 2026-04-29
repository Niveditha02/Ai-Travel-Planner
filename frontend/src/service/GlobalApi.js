import axios from "axios";

const BACKEND = (import.meta.env.VITE_BACKEND_URL || "http://localhost:5000") + "/api";

export const generateTrip = async (formData) =>
    axios.post(`${BACKEND}/generate-trip`, formData);

export const getTrip = async (tripId) =>
    axios.get(`${BACKEND}/get-trip/${tripId}`);
