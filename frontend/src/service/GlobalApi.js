import axios from "axios";

const PRODUCTION_BACKEND_URL = "https://ai-travel-planner-api.onrender.com";
const LOCAL_BACKEND_URL = "http://localhost:10000";

const normalizeBaseUrl = (url) => String(url || "").trim().replace(/\/+$/, "");
const envBackendUrl = normalizeBaseUrl(import.meta.env.VITE_BACKEND_URL);
const defaultBackendUrl = import.meta.env.PROD ? PRODUCTION_BACKEND_URL : LOCAL_BACKEND_URL;
const baseBackendUrl = envBackendUrl && envBackendUrl !== "/" ? envBackendUrl : defaultBackendUrl;

const BACKEND = `${baseBackendUrl}/api`;

export const generateTrip = async (formData) =>
    axios.post(`${BACKEND}/generate-trip`, formData);

export const getTrip = async (tripId) =>
    axios.get(`${BACKEND}/get-trip/${tripId}`);
