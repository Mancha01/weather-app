"use client";

import React from "react";
import { Card } from "./Card";
import { Skeleton } from "./Skeleton";

export const CityCardSkeleton: React.FC = () => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex-1">
          <Skeleton width="60%" height={24} className="mb-2" />
          <Skeleton width="40%" height={16} />
        </div>
        <Skeleton variant="circular" width={40} height={40} />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Skeleton variant="circular" width={64} height={64} />
          <div>
            <Skeleton width={80} height={32} className="mb-1" />
            <Skeleton width={100} height={16} />
          </div>
        </div>
        <Skeleton width={60} height={32} />
      </div>
    </Card>
  );
};

CityCardSkeleton.displayName = "CityCardSkeleton";
