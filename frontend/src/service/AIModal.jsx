import { generateTrip } from './GlobalApi';

export const chatSession = {
  sendMessage: async (formData) => {
    try {
      console.log("Sending request to backend with data:", formData);
      
      const response = await generateTrip(formData);

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






