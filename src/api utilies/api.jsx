import axios from "axios"

const API_BASE_URL = "https://backend-xq4o.onrender.com";

export const fetchSearchResults = async (query) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/search/?query=${query}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching search results:", error);
    return [];
  }
};