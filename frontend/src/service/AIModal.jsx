import axios from 'axios';

const BACKEND_URL = 'http://localhost:5000/api/generate-trip';

export const chatSession = {
  sendMessage: async (formData) => {
    try {
      console.log("Sending request to backend with data:", formData);
      
      const response = await axios.post(BACKEND_URL, formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data) {
        return {
          response: {
            text: () => response.data.result,
            tripId: response.data.tripId
          }
        };
      } else {
        throw new Error('Invalid response from backend');
      }
    } catch (error) {
      console.error("Backend API Error:", error.response ? error.response.data : error.message);
      throw error;
    }
  }
};






