import React from 'react';

const SkeletonLoader = () => {
  return (
    <div className="m-2 shadow-md rounded-md animate-pulse">
      <div className="bg-gray-300 h-6 w-full mb-4 rounded-t-md"></div>
      <div className="flex justify-around text-3xl p-3">
        <div className="bg-gray-300 h-6 w-1/4 rounded-md"></div>
        <div className="bg-gray-300 h-6 w-1/4 rounded-md"></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;