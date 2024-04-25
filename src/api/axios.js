import axios from 'axios';


const BASE_URL = 'https://api.openweathermap.org';
const APIKEY = import.meta.env.VITE_API_KEY;

const axiosPublic = axios.create({
  baseURL: BASE_URL,
});

export const getCurrentWeather = async (lat, lon, units, lang) => {
  const response = await axiosPublic.get(
    `/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}&units=${units}&lang=${lang}`
  );
  return response;
};

export const getFiveDayForecast = async (lat, lon, units, lang) => {
  const response = await axiosPublic.get(
    `/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKEY}&units=${units}&lang=${lang}`
  );
  return response;
};

export const getAirPollution = async (lat, lon) => {
  const response = await axiosPublic.get(
    `data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${APIKEY}`
  );
  return response;
};

export const getDirectGeoCoding = async (cityName) => {
  const response = await axiosPublic.get(`/geo/1.0/direct?q=${cityName}&limit=5&appid=${APIKEY}`);
  return response;
};
