"use client";

import React, { useState, useEffect } from "react";
import { Input } from "./ui";
import { searchCities } from "@/services/locationApi";
import { GeonamesPlace } from "@/types/city";

interface SearchBarProps {
  onCitySelect: (place: GeonamesPlace) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onCitySelect }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<GeonamesPlace[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);

  // Debounce search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setShowResults(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      setError(null);

      try {
        const places = await searchCities(query);
        setResults(places);
        setShowResults(true);
      } catch {
        setError("Failed to search cities. Please try again.");
        setResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (place: GeonamesPlace) => {
    console.log("City selected:", place);
    onCitySelect(place);
    setQuery("");
    setResults([]);
    setShowResults(false);
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search for a city..."
          value={query}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setQuery(e.target.value)
          }
          className="pr-10"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {isSearching ? (
            <svg
              className="animate-spin h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            <svg
              className="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          )}
        </div>
      </div>

      {/* Search Results Dropdown */}
      {showResults && results.length > 0 && (
        <div className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg max-h-96 overflow-y-auto">
          {results.map((place) => (
            <button
              key={place.geonameId}
              onClick={() => handleSelect(place)}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b last:border-b-0 transition-colors"
            >
              <div className="font-medium text-gray-900">{place.name}</div>
              <div className="text-sm text-gray-500">
                {place.adminName1 && `${place.adminName1}, `}
                {place.countryName}
              </div>
            </button>
          ))}
        </div>
      )}

      {showResults && results.length === 0 && !isSearching && query && (
        <div className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg p-4">
          <p className="text-sm text-gray-500">No cities found</p>
        </div>
      )}

      {error && (
        <div className="absolute z-10 w-full mt-2 bg-red-50 rounded-lg shadow-lg p-4">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
    </div>
  );
};
