// components/common/SkeletonLoader.tsx
import React from "react";

const SkeletonLoader = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="flex flex-col h-full border rounded-lg overflow-hidden shadow-sm animate-pulse"
        >
          {/* Header */}
          <div className="p-4">
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
          </div>

          {/* Image */}
          <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>

          {/* Content */}
          <div className="p-4 flex-grow">
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 flex justify-between">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4 self-center"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
