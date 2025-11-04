"use client";

import React, { useMemo } from "react";
import { City } from "@/types/city";
import { CityCard } from "./CityCard";
import { Spinner, ErrorMessage } from "./ui";

interface CityListProps {
  cities: City[];
  favorites: string[];
  temperatures: Record<string, number>;
  loading?: boolean;
  error?: string | null;
  onToggleFavorite: (cityId: string) => void;
  onRemoveCity?: (cityId: string) => void;
}

export const CityList: React.FC<CityListProps> = ({
  cities,
  favorites,
  temperatures,
  loading,
  error,
  onToggleFavorite,
  onRemoveCity,
}) => {
  // Sort cities: favorites first (alphabetically), then non-favorites (alphabetically)
  const sortedCities = useMemo(() => {
    const favoriteCities = cities.filter((city) => favorites.includes(city.id));
    const nonFavoriteCities = cities.filter(
      (city) => !favorites.includes(city.id)
    );

    const sortAlphabetically = (a: City, b: City) =>
      a.name.localeCompare(b.name);

    return [
      ...favoriteCities.sort(sortAlphabetically),
      ...nonFavoriteCities.sort(sortAlphabetically),
    ];
  }, [cities, favorites]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (cities.length === 0) {
    return (
      <div className="text-center py-12">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No cities</h3>
        <p className="mt-1 text-sm text-gray-500">
          Get started by searching for a city.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {sortedCities.length > 0 && favorites.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <svg
              className="h-5 w-5 mr-2 text-yellow-400 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Favorite Cities
          </h2>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedCities.map((city) => (
          <CityCard
            key={city.id}
            city={city}
            temperature={temperatures[city.id]}
            isFavorite={favorites.includes(city.id)}
            onToggleFavorite={onToggleFavorite}
            onRemove={onRemoveCity}
          />
        ))}
      </div>
    </div>
  );
};
