import axios from 'axios';

const API_KEY = '3e0b587d';
const BASE_URL = 'https://api.hgbrasil.com/weather';

export const getWeatherData = async (city) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        city_name: city,
        fields: 'temp,description,forecast,max,min,wind_speedy,humidity,condition_slug,hourly,date',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};