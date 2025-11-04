"use client";

import React from "react";
import Image from "next/image";
import { WeatherResponse } from "@/types/weather";
import { Card, Spinner, ErrorMessage, Badge } from "./ui";

interface CityDetailsProps {
  weather: WeatherResponse | null;
  loading: boolean;
  error: string | null;
}

export const CityDetails: React.FC<CityDetailsProps> = ({
  weather,
  loading,
  error,
}) => {
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

  if (!weather) {
    return (
      <Card>
        <p className="text-gray-500 text-center">No weather data available</p>
      </Card>
    );
  }

  const { location, current } = weather;

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {location.name}
            </h1>
            <p className="text-gray-500 mt-1">
              {location.region && `${location.region}, `}
              {location.country}
            </p>
            <p className="text-sm text-gray-400 mt-1">
              {new Date(location.localtime).toLocaleString()}
            </p>
          </div>
          <div className="text-right">
            <div className="text-5xl font-bold text-blue-600">
              {current.temperature}°C
            </div>
            <div className="text-gray-500 mt-1">
              Feels like {current.feelslike}°C
            </div>
          </div>
        </div>

        {/* Weather Description */}
        <div className="mt-6 flex items-center space-x-4">
          {current.weather_icons && current.weather_icons[0] && (
            <Image
              src={current.weather_icons[0]}
              alt="Weather icon"
              width={64}
              height={64}
              className="w-16 h-16"
            />
          )}
          <div>
            {current.weather_descriptions &&
              current.weather_descriptions.map((desc, idx) => (
                <Badge key={idx} variant="default" className="mr-2">
                  {desc}
                </Badge>
              ))}
          </div>
        </div>
      </Card>

      {/* Weather Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg
                className="h-6 w-6 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Humidity</p>
              <p className="text-2xl font-semibold text-gray-900">
                {current.humidity}%
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg
                className="h-6 w-6 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Wind Speed</p>
              <p className="text-2xl font-semibold text-gray-900">
                {current.wind_speed} km/h
              </p>
              <p className="text-xs text-gray-400">{current.wind_dir}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <svg
                className="h-6 w-6 text-purple-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Pressure</p>
              <p className="text-2xl font-semibold text-gray-900">
                {current.pressure} mb
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <svg
                className="h-6 w-6 text-yellow-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">UV Index</p>
              <p className="text-2xl font-semibold text-gray-900">
                {current.uv_index}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <svg
                className="h-6 w-6 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Visibility</p>
              <p className="text-2xl font-semibold text-gray-900">
                {current.visibility} km
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <svg
                className="h-6 w-6 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Cloud Cover</p>
              <p className="text-2xl font-semibold text-gray-900">
                {current.cloudcover}%
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
