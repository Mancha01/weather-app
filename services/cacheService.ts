import { WeatherResponse } from "../types/weather";
import { CACHE_DURATION } from "../utils/constants";
import { getCachedCities, setCachedCities } from "../utils/storage";

/**
 * Retrieves cached weather data for a city if available and not expired
 * @param cityId - Unique identifier for the city
 * @returns Cached weather data or null if not found/expired
 * @example
 * const cachedWeather = getCachedWeather("lagos-nigeria");
 */
export const getCachedWeather = (cityId: string): WeatherResponse | null => {
  try {
    const cache = getCachedCities();
    const cached = cache[cityId];

    if (!cached) return null;

    if (isExpired(cached.timestamp)) {
      // Remove expired cache
      delete cache[cityId];
      setCachedCities(cache);
      return null;
    }

    return cached.data;
  } catch (error) {
    console.error("Error retrieving cached weather:", error);
    return null;
  }
};

/**
 * Caches weather data for a city with current timestamp
 * @param cityId - Unique identifier for the city
 * @param data - Weather data to cache
 * @example
 * setCachedWeather("lagos-nigeria", weatherResponse);
 */
export const setCachedWeather = (
  cityId: string,
  data: WeatherResponse
): void => {
  try {
    const cache = getCachedCities();
    cache[cityId] = {
      data,
      timestamp: Date.now(),
    };
    setCachedCities(cache);
  } catch (error) {
    console.error("Error caching weather data:", error);
  }
};

export const clearExpiredCache = (): void => {
  try {
    const cache = getCachedCities();
    let hasChanges = false;

    Object.keys(cache).forEach((cityId) => {
      if (isExpired(cache[cityId].timestamp)) {
        delete cache[cityId];
        hasChanges = true;
      }
    });

    if (hasChanges) {
      setCachedCities(cache);
    }
  } catch (error) {
    console.error("Error clearing expired cache:", error);
  }
};

export const isExpired = (timestamp: number): boolean => {
  return Date.now() - timestamp > CACHE_DURATION;
};

export const getCacheStats = (): { total: number; expired: number } => {
  try {
    const cache = getCachedCities();
    let expired = 0;

    Object.values(cache).forEach((cached) => {
      if (isExpired(cached.timestamp)) {
        expired++;
      }
    });

    return {
      total: Object.keys(cache).length,
      expired,
    };
  } catch (error) {
    console.error("Error getting cache stats:", error);
    return { total: 0, expired: 0 };
  }
};

// Initialize cache cleanup on module load
if (typeof window !== "undefined") {
  // Clean up expired cache when the app starts
  clearExpiredCache();
}
