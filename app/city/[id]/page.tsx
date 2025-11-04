"use client";

import React from "react";
import dynamic from "next/dynamic";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { toggleFavorite } from "@/store/favoritesSlice";
import { Layout } from "@/components/Layout";
import { FavoriteToggle } from "@/components/FavoriteToggle";
import { Button, CityDetailsSkeleton } from "@/components/ui";
import { useWeather } from "@/hooks/useWeather";
import { City } from "@/types/city";

// Dynamically import heavy components
const CityDetails = dynamic(
  () =>
    import("@/components/CityDetails").then((mod) => ({
      default: mod.CityDetails,
    })),
  {
    loading: () => <CityDetailsSkeleton />,
  }
);

const NotesSection = dynamic(
  () =>
    import("@/components/NotesSection").then((mod) => ({
      default: mod.NotesSection,
    })),
  {
    ssr: false, // Notes are client-side only with localStorage
  }
);

// Disable static generation for this page
export const dynamicParams = true;
export const revalidate = 0;

export default function CityPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const cityId = params.id as string;
  const cities = useSelector((state: RootState) => state.weather?.cities || []);
  const favorites = useSelector(
    (state: RootState) => state.favorites?.favorites || []
  );

  const city = cities.find((c: City) => c.id === cityId) || null;

  const { data: weather, loading, error } = useWeather(city);
  const isFavorite = city ? favorites.includes(city.id) : false;

  const handleToggleFavorite = () => {
    if (city) {
      dispatch(toggleFavorite(city.id));
    }
  };

  const handleBack = () => {
    router.push("/");
  };

  if (!city && !loading) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900">City not found</h1>
          <p className="mt-2 text-gray-600">
            The requested city could not be found.
          </p>
          <Button className="mt-4" onClick={handleBack}>
            Go Back Home
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Back Button and Favorite */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={handleBack}>
            <svg
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Cities
          </Button>

          {city && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">
                {isFavorite ? "Remove from favorites" : "Add to favorites"}
              </span>
              <FavoriteToggle
                isFavorite={isFavorite}
                onClick={handleToggleFavorite}
                size="lg"
              />
            </div>
          )}
        </div>

        {/* City Weather Details */}
        {loading ? (
          <CityDetailsSkeleton />
        ) : (
          <>
            <CityDetails weather={weather} loading={loading} error={error} />
            {city && <NotesSection cityId={city.id} />}
          </>
        )}
      </div>
    </Layout>
  );
}
