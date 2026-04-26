import axios from "axios";

const BACKEND = "http://localhost:5000/api";

// Single unified function - calls backend proxy which tries Wikipedia → Wikimedia Commons → Unsplash
export const GetPlaceImage = async (placeName, location = "") => {
    const query = location ? `${placeName} ${location}` : placeName;
    const resp = await axios.get(`${BACKEND}/place-image?query=${encodeURIComponent(query)}`);
    return resp.data?.imageUrl || null;
}

// Keep for backwards compatibility (hotels)
export const GetPlaceDetails = (query) => {
    return axios.get(`https://api.unsplash.com/search/photos?query=${query}&client_id=lzvDIu-cYl-4LrBBEN5JTK1XSBl27rCXGbm13elg3Vo&per_page=1`);
}
