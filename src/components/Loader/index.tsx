import React from "react";

const LoadingComponent = ({ loading }: { loading?: boolean }) => {
  return (
    <>
      {loading && (
        <div className="flex items-center justify-center min-h-screen">
          <div
            className="flex items-center justify-center space-x-2"
            role="status" // Add role="status" here
          >
            {/* Tailwind spinner */}
            <div className="w-8 h-8 border-4 border-gray-800 border-solid rounded-full border-t-transparent animate-spin"></div>
            <p className="text-gray-800 text-lg font-semibold">Loading...</p>
          </div>
        </div>
      )}
    </>
  );
};

export default LoadingComponent;
