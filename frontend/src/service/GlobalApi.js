import axios from "axios";

const PRODUCTION_BACKEND_URL = "https://ai-travel-planner-api-340p.onrender.com";
const LOCAL_BACKEND_URL = "http://localhost:10000";

const normalizeBaseUrl = (url) => String(url || "").trim().replace(/\/+$/, "");
const isAbsoluteHttpUrl = (url) => /^https?:\/\//i.test(url);
const isCurrentOrigin = (url) =>
    typeof window !== "undefined" && normalizeBaseUrl(window.location.origin) === url;

const getBackendUrl = () => {
    const envBackendUrl = normalizeBaseUrl(import.meta.env.VITE_BACKEND_URL);

    if (import.meta.env.PROD) {
        if (isAbsoluteHttpUrl(envBackendUrl) && !isCurrentOrigin(envBackendUrl)) {
            return envBackendUrl;
        }

        return PRODUCTION_BACKEND_URL;
    }

    return envBackendUrl || LOCAL_BACKEND_URL;
};

const BACKEND = `${getBackendUrl()}/api`;

export const generateTrip = async (formData) =>
    axios.post(`${BACKEND}/generate-plan`, formData);

export const getTrip = async (tripId) =>
    axios.get(`${BACKEND}/get-trip/${tripId}`);
