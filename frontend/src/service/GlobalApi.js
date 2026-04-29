import axios from "axios";

const normalizeBaseUrl = (url) => url.replace(/\/+$/, "");

const BACKEND = `${normalizeBaseUrl(import.meta.env.VITE_BACKEND_URL || "http://localhost:10000")}/api`;

export const generateTrip = async (formData) =>
    axios.post(`${BACKEND}/generate-trip`, formData);

export const getTrip = async (tripId) =>
    axios.get(`${BACKEND}/get-trip/${tripId}`);
