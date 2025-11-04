import axios from "axios";
import { WeatherResponse, WeatherError } from "../types/weather";

const WEATHERSTACK_API_KEY = process.env.NEXT_PUBLIC_WEATHERSTACK_API_KEY;
const WEATHERSTACK_BASE_URL = "http://api.weatherstack.com/current";

if (!WEATHERSTACK_API_KEY) {
  throw new Error("Weatherstack API key is not configured");
}

export const fetchWeatherByCity = async (
  cityName: string
): Promise<WeatherResponse> => {
  try {
    const response = await axios.get<WeatherResponse | WeatherError>(
      WEATHERSTACK_BASE_URL,
      {
        params: {
          access_key: WEATHERSTACK_API_KEY,
          query: cityName,
          units: "m", // metric
        },
      }
    );

    if ("error" in response.data) {
      throw new Error(response.data.error.info || "Weather API error");
    }

    return response.data as WeatherResponse;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Weather API request failed: ${error.message}`);
    }
    throw error;
  }
};

export const fetchWeatherByCoords = async (
  lat: number,
  lon: number
): Promise<WeatherResponse> => {
  try {
    const response = await axios.get<WeatherResponse | WeatherError>(
      WEATHERSTACK_BASE_URL,
      {
        params: {
          access_key: WEATHERSTACK_API_KEY,
          query: `${lat},${lon}`,
          units: "m", // metric
        },
      }
    );

    if ("error" in response.data) {
      throw new Error(response.data.error.info || "Weather API error");
    }

    return response.data as WeatherResponse;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Weather API request failed: ${error.message}`);
    }
    throw error;
  }
};

export const isWeatherApiAvailable = (): boolean => {
  return !!WEATHERSTACK_API_KEY;
};
