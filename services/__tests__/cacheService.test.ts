import {
  getCachedWeather,
  setCachedWeather,
  isCacheValid,
} from "../cacheService";
import type { WeatherResponse } from "@/types/weather";

describe("Cache Service", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  const mockWeatherData: WeatherResponse = {
    location: {
      name: "Lagos",
      country: "Nigeria",
      region: "Lagos",
      lat: "6.45",
      lon: "3.40",
      timezone_id: "Africa/Lagos",
      localtime: "2025-11-04 10:00",
      localtime_epoch: 1730714400,
      utc_offset: "1.0",
    },
    current: {
      temperature: 28,
      weather_descriptions: ["Partly cloudy"],
      weather_icons: ["icon.png"],
      wind_speed: 15,
      wind_degree: 180,
      wind_dir: "S",
      pressure: 1013,
      precip: 0,
      humidity: 75,
      cloudcover: 50,
      feelslike: 30,
      uv_index: 7,
      visibility: 10,
      is_day: "yes",
    },
  };

  describe("setCachedWeather", () => {
    it("should cache weather data with timestamp", () => {
      const cityName = "Lagos";

      setCachedWeather(cityName, mockWeatherData);

      const cached = localStorage.getItem(`weather_${cityName}`);
      expect(cached).toBeTruthy();

      const parsed = JSON.parse(cached!);
      expect(parsed.data).toEqual(mockWeatherData);
      expect(parsed.timestamp).toBeDefined();
    });
  });

  describe("getCachedWeather", () => {
    it("should return cached weather data if valid", () => {
      const cityName = "Lagos";
      setCachedWeather(cityName, mockWeatherData);

      const result = getCachedWeather(cityName);

      expect(result).toEqual(mockWeatherData);
    });

    it("should return null for non-existent cache", () => {
      const result = getCachedWeather("NonExistentCity");
      expect(result).toBeNull();
    });

    it("should return null for expired cache", () => {
      const cityName = "Lagos";
      const expiredTimestamp = Date.now() - 11 * 60 * 1000; // 11 minutes ago

      localStorage.setItem(
        `weather_${cityName}`,
        JSON.stringify({
          data: mockWeatherData,
          timestamp: expiredTimestamp,
        })
      );

      const result = getCachedWeather(cityName);
      expect(result).toBeNull();
    });
  });

  describe("isCacheValid", () => {
    it("should return true for recent cache", () => {
      const timestamp = Date.now();
      expect(isCacheValid(timestamp)).toBe(true);
    });

    it("should return false for old cache", () => {
      const timestamp = Date.now() - 11 * 60 * 1000;
      expect(isCacheValid(timestamp)).toBe(false);
    });
  });
});
