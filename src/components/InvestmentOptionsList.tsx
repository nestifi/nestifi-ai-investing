
import React from "react";
import { Button } from "@/components/ui/button";
import { Check, ChevronRight } from "lucide-react";

interface ChildData {
  id: string;
  name: string;
  dob: string;
  profileImage?: string;
  hasInvestmentOptions?: boolean;
}

interface InvestmentOptionsListProps {
  children: ChildData[];
  onSelectChild: (childId: string) => void;
  onContinue: () => void;
}

export const InvestmentOptionsList: React.FC<InvestmentOptionsListProps> = ({
  children,
  onSelectChild,
  onContinue,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Add investment options</h2>
        <p className="text-gray-600 text-sm">
          To improve investment experience add information about <span className="font-medium">future goals</span>, <span className="font-medium">family circle</span> and <span className="font-medium">investment dates</span> for each child.
        </p>
      </div>

      <div className="space-y-3">
        {children.map((child) => (
          <div
            key={child.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer"
            onClick={() => onSelectChild(child.id)}
          >
            <div className="flex items-center space-x-3">
              {child.hasInvestmentOptions && (
                <div className="flex items-center justify-center w-6 h-6 bg-green-100 rounded-full">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
              )}
              <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                {child.profileImage ? (
                  <img
                    src={child.profileImage}
                    alt={child.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-green-100 flex items-center justify-center">
                    <span className="text-lg font-bold text-green-500">
                      {child.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-medium">{child.name}</h3>
                <p className="text-sm text-gray-500">{child.dob}</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </div>
        ))}
      </div>

      <div className="pt-4">
        <Button
          onClick={onContinue}
          className="w-full h-12 bg-green-500 hover:bg-green-600"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
