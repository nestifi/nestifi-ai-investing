
import React from "react";
import { Button } from "@/components/ui/button";

interface AddChildIntroProps {
  onAddChild: () => void;
  onContinue: () => void;
}

export const AddChildIntro: React.FC<AddChildIntroProps> = ({
  onAddChild,
  onContinue,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Add child to your family circle</h1>
      </div>

      <div className="flex justify-center my-8">
        <div className="relative">
          <img
            src="/lovable-uploads/489f8a28-2dc5-4151-8e06-c7f8fda2c6a5.png"
            alt="Family circle"
            className="w-48 h-48 object-contain"
          />
        </div>
      </div>

      <div className="text-center mb-8">
        <p className="text-gray-600">
          Your Family Circle includes trusted family members and friends who can contribute to your child's financial future. Share updates, set goals together, and make investing a collaborative experience.
        </p>
      </div>

      <div className="space-y-3">
        <Button
          onClick={onAddChild}
          className="w-full h-12 bg-green-500 hover:bg-green-600"
        >
          Add child
        </Button>
        <Button
          variant="outline"
          onClick={onContinue}
          className="w-full h-12"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
