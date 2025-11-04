import { useState, useEffect } from "react";
import { WeatherResponse } from "../types/weather";
import { City } from "../types/city";
import {
  fetchWeatherByCity,
  fetchWeatherByCoords,
} from "../services/weatherApi";
import { getCachedWeather, setCachedWeather } from "../services/cacheService";

interface UseWeatherState {
  data: WeatherResponse | null;
  loading: boolean;
  error: string | null;
}

/**
 * Custom hook to fetch and manage weather data for a city
 * Implements caching to minimize API calls and support offline usage
 * @param city - City object containing name and coordinates, or null
 * @returns Object containing weather data, loading state, and error message
 * @example
 * const { data, loading, error } = useWeather(selectedCity);
 * if (loading) return <Spinner />;
 * if (error) return <Error message={error} />;
 * return <WeatherDisplay weather={data} />;
 */
export const useWeather = (city: City | null): UseWeatherState => {
  const [state, setState] = useState<UseWeatherState>({
    data: null,
    loading: false,
    error: null,
  });

  useEffect(() => {
    if (!city) {
      // eslint-disable-next-line
      setState({ data: null, loading: false, error: null });
      return;
    }

    const fetchWeather = async () => {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        // Check cache first
        const cached = getCachedWeather(city.id);
        if (cached) {
          setState({ data: cached, loading: false, error: null });
          return;
        }

        // Fetch from API
        let weatherData: WeatherResponse;
        if (city.lat && city.lon) {
          weatherData = await fetchWeatherByCoords(city.lat, city.lon);
        } else {
          weatherData = await fetchWeatherByCity(city.name);
        }

        // Cache the result
        setCachedWeather(city.id, weatherData);

        setState({ data: weatherData, loading: false, error: null });
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Failed to fetch weather data";
        setState({ data: null, loading: false, error: errorMessage });
      }
    };

    fetchWeather();
  }, [city]);

  return state;
};
