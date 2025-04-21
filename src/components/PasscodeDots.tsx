
import React from "react";

interface PasscodeDotsProps {
  length: number;
  filledCount: number;
}

export const PasscodeDots: React.FC<PasscodeDotsProps> = ({ length, filledCount }) => {
  return (
    <div className="flex justify-center space-x-4 my-8">
      {Array.from({ length }).map((_, index) => (
        <div
          key={index}
          className={`w-4 h-4 rounded-full ${
            index < filledCount ? "bg-primary" : "bg-gray-300"
          }`}
        />
      ))}
    </div>
  );
};
