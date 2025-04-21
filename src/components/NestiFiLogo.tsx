
import React from "react";

export const NestiFiLogo: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-32 h-32 rounded-full bg-white border-4 border-green-500 flex items-center justify-center">
        <span className="text-3xl font-bold text-green-500">NestiFi</span>
      </div>
      <p className="text-sm text-gray-500 mt-2">Family Investment App</p>
    </div>
  );
};
