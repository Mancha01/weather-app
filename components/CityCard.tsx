"use client";

import React from "react";
import Link from "next/link";
import { City } from "@/types/city";
import { Card } from "./ui";

interface CityCardProps {
  city: City;
  temperature?: number;
  isFavorite: boolean;
  onToggleFavorite: (cityId: string) => void;
  onRemove?: (cityId: string) => void;
}

export const CityCard: React.FC<CityCardProps> = ({
  city,
  temperature,
  isFavorite,
  onToggleFavorite,
  onRemove,
}) => {
  return (
    <Card className="relative" hover>
      <Link href={`/city/${city.id}`} className="block">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">{city.name}</h3>
            <p className="text-sm text-gray-500">{city.country}</p>
          </div>

          {temperature !== undefined && (
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">
                {temperature}°C
              </div>
            </div>
          )}
        </div>
      </Link>

      {/* Actions */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(city.id);
          }}
          className="flex items-center space-x-1 text-sm hover:text-yellow-500 transition-colors"
        >
          <svg
            className={`h-5 w-5 ${
              isFavorite
                ? "fill-yellow-400 text-yellow-400"
                : "fill-none text-gray-400"
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
          <span className="text-gray-600">
            {isFavorite ? "Favorited" : "Favorite"}
          </span>
        </button>

        {onRemove && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove(city.id);
            }}
            className="text-sm text-red-600 hover:text-red-700 transition-colors"
          >
            Remove
          </button>
        )}
      </div>
    </Card>
  );
};
