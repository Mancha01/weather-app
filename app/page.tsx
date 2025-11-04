"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setCities, removeCity } from "@/store/weatherSlice";
import { toggleFavorite } from "@/store/favoritesSlice";
import { Layout } from "@/components/Layout";
import { SearchBar } from "@/components/SearchBar";
import { CityList } from "@/components/CityList";
import { Button, ErrorMessage } from "@/components/ui";
import { LARGEST_CITIES } from "@/utils/constants";
import { fetchWeatherByCity } from "@/services/weatherApi";
import { useGeolocation } from "@/hooks/useGeolocation";
import { reverseGeocode } from "@/services/locationApi";
import { City } from "@/types/city";
import { GeonamesPlace } from "@/types/city";

// Disable static generation for this page
export const dynamic = "force-dynamic";

export default function Home() {
  const dispatch = useDispatch();
  const cities = useSelector((state: RootState) => state.weather?.cities || []);
  const favorites = useSelector(
    (state: RootState) => state.favorites?.favorites || []
  );
  const {
    position,
    loading: geoLoading,
    error: geoError,
    requestLocation,
  } = useGeolocation();

  const [temperatures, setTemperatures] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showLocationPrompt, setShowLocationPrompt] = useState(true);

  // Initialize with 15 largest cities
  useEffect(() => {
    if (cities.length === 0) {
      dispatch(setCities(LARGEST_CITIES));
    }
  }, [dispatch, cities.length]);

  // Fetch weather for all cities
  useEffect(() => {
    const fetchAllWeather = async () => {
      if (cities.length === 0) return;

      setLoading(true);
      setError(null);

      try {
        const tempData: Record<string, number> = {};

        await Promise.all(
          cities.map(async (city: City) => {
            try {
              const weather = await fetchWeatherByCity(city.name);
              tempData[city.id] = weather.current.temperature;
            } catch (err) {
              console.error(`Failed to fetch weather for ${city.name}:`, err);
            }
          })
        );

        setTemperatures(tempData);
      } catch {
        setError("Failed to fetch weather data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllWeather();
  }, [cities]);

  // Handle geolocation
  useEffect(() => {
    const addUserLocation = async () => {
      if (!position) return;

      try {
        const place = await reverseGeocode(
          position.latitude,
          position.longitude
        );
        if (place) {
          const userCity: City = {
            id: `user-location-${place.geonameId}`,
            name: place.name,
            country: place.countryName,
            lat: parseFloat(place.lat),
            lon: parseFloat(place.lng),
            isFavorite: false,
          };

          // Add user location to the list if not already present
          if (!cities.find((c: City) => c.id === userCity.id)) {
            dispatch(setCities([userCity, ...cities]));
          }
        }
      } catch (err) {
        console.error("Failed to get user location:", err);
      }
    };

    addUserLocation();
  }, [position, cities, dispatch]);

  const handleCitySearch = (place: GeonamesPlace) => {
    const newCity: City = {
      id: `search-${place.geonameId}`,
      name: place.name,
      country: place.countryName,
      lat: parseFloat(place.lat),
      lon: parseFloat(place.lng),
      isFavorite: false,
    };

    // Add city if not already in list
    if (!cities.find((c: City) => c.id === newCity.id)) {
      dispatch(setCities([...cities, newCity]));
    }
  };

  const handleToggleFavorite = (cityId: string) => {
    dispatch(toggleFavorite(cityId));
  };

  const handleRemoveCity = (cityId: string) => {
    dispatch(removeCity(cityId));
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header Section */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Weather Dashboard
          </h1>
          <p className="mt-2 text-gray-600">
            View current weather for cities around the world
          </p>
        </div>

        {/* Location Prompt */}
        {showLocationPrompt && !position && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <svg
                  className="h-6 w-6 text-blue-600 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-blue-800">
                    Get weather for your location
                  </h3>
                  <p className="mt-1 text-sm text-blue-700">
                    Allow location access to see weather for your current city
                  </p>
                  <div className="mt-3">
                    <Button
                      size="sm"
                      onClick={requestLocation}
                      isLoading={geoLoading}
                    >
                      Enable Location
                    </Button>
                  </div>
                  {geoError && (
                    <p className="mt-2 text-sm text-red-600">{geoError}</p>
                  )}
                </div>
              </div>
              <button
                onClick={() => setShowLocationPrompt(false)}
                className="text-blue-400 hover:text-blue-500"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Search Bar */}
        <div>
          <SearchBar onCitySelect={handleCitySearch} />
        </div>

        {/* Error Display */}
        {error && <ErrorMessage message={error} />}

        {/* Cities List */}
        <CityList
          cities={cities}
          favorites={favorites}
          temperatures={temperatures}
          loading={loading}
          onToggleFavorite={handleToggleFavorite}
          onRemoveCity={handleRemoveCity}
        />
      </div>
    </Layout>
  );
}
