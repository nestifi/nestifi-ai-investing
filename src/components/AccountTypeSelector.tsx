
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface AccountTypeSelectorProps {
  selectedType: "adult" | "child" | null;
  onSelect: (type: "adult" | "child") => void;
}

export const AccountTypeSelector: React.FC<AccountTypeSelectorProps> = ({
  selectedType,
  onSelect,
}) => {
  return (
    <div className="space-y-4">
      <Card 
        className={`p-4 cursor-pointer border-2 ${
          selectedType === "adult" ? "border-green-500 bg-green-50" : "border-gray-200"
        }`}
        onClick={() => onSelect("adult")}
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <img
              src="/lovable-uploads/100b1315-2781-42dd-b95e-b8e617212cb3.png"
              alt="Adult avatar"
              className="w-12 h-12 rounded-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg">Adult Account</h3>
            <p className="text-sm text-gray-600">
              Take control of your finances, save money, and start building a brighter future for your family.
            </p>
          </div>
        </div>
      </Card>

      <Card 
        className={`p-4 cursor-pointer border-2 ${
          selectedType === "child" ? "border-green-500 bg-green-50" : "border-gray-200"
        }`}
        onClick={() => onSelect("child")}
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <img
              src="/lovable-uploads/c322bcfd-0430-4a62-b9e2-7f352c830851.png"
              alt="Child avatar"
              className="w-12 h-12 rounded-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg">Child Account</h3>
            <p className="text-sm text-gray-600">
              Help your child grow financially with a secure account designed for their future.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
