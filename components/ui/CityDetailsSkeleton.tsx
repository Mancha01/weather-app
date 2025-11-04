"use client";

import React from "react";
import { Card } from "./Card";
import { Skeleton } from "./Skeleton";

export const CityDetailsSkeleton: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <Skeleton width="50%" height={32} />
          <Skeleton variant="circular" width={40} height={40} />
        </div>
        <Skeleton width="30%" height={16} />
      </Card>

      {/* Current Weather Skeleton */}
      <Card className="p-6">
        <Skeleton width="40%" height={24} className="mb-4" />
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Skeleton variant="circular" width={80} height={80} />
            <div>
              <Skeleton width={120} height={48} className="mb-2" />
              <Skeleton width={150} height={20} />
            </div>
          </div>
        </div>
      </Card>

      {/* Weather Details Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index} className="p-4">
            <Skeleton width="60%" height={16} className="mb-2" />
            <Skeleton width="80%" height={24} />
          </Card>
        ))}
      </div>

      {/* Notes Section Skeleton */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <Skeleton width="30%" height={24} />
          <Skeleton width={100} height={36} />
        </div>
        <div className="space-y-3">
          <Skeleton width="100%" height={60} />
          <Skeleton width="100%" height={60} />
        </div>
      </Card>
    </div>
  );
};

CityDetailsSkeleton.displayName = "CityDetailsSkeleton";
