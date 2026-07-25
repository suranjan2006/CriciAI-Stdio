import axios from "axios";

const BASE_URL = "https://api.cricapi.com/v1";

export async function getCurrentMatches() {
  try {
    const response = await axios.get(`${BASE_URL}/currentMatches`, {
      params: {
        apikey: process.env.CRICAPI_KEY,
        offset: 0,
      },
    });

    return response.data;
  } catch (error: any) {
    console.error(error.response?.data || error.message);
    throw error;
  }
}