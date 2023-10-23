// src/api/api.js
import axios from 'axios';

const baseURL = 'https://judysphere.onrender.com/api';

const instance = axios.create({
  baseURL,
});

export const fetchData = async (endpoint) => {
  try {
    const response = await instance.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Rethrow the error for handling in the component.
  }
};
