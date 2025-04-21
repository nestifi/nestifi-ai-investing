
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

interface ChildProfileSummaryProps {
  childData: {
    name: string;
    profileImage?: string;
    futureGoals?: string[];
    familyCircle?: { name: string; relation: string }[];
    investmentDetails?: { amount: string; frequency: string };
  };
  onEditSection: (section: "goals" | "family" | "investment") => void;
  onSave: () => void;
}

export const ChildProfileSummary: React.FC<ChildProfileSummaryProps> = ({
  childData,
  onEditSection,
  onSave,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden">
          {childData.profileImage ? (
            <img
              src={childData.profileImage}
              alt={childData.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-green-100 flex items-center justify-center">
              <span className="text-xl font-bold text-green-500">
                {childData.name.charAt(0)}
              </span>
            </div>
          )}
        </div>
        <h2 className="text-xl font-semibold">{childData.name}'s profile</h2>
      </div>

      <Card className="p-4 bg-blue-50 border-blue-200">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">Future goals</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {childData.futureGoals && childData.futureGoals.length > 0 ? (
                childData.futureGoals.map((goal, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-white rounded-full text-sm"
                  >
                    {goal}
                  </span>
                ))
              ) : (
                <span className="text-sm text-gray-500">No goals yet</span>
              )}
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEditSection("goals")}
            className="h-8 w-8"
          >
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      </Card>

      <Card className="p-4 bg-red-50 border-red-200">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">Family circle</h3>
            {childData.familyCircle && childData.familyCircle.length > 0 ? (
              <div className="mt-2 space-y-2">
                {childData.familyCircle.map((member, index) => (
                  <div key={index} className="text-sm">
                    <span className="font-medium">{member.relation}</span>
                    <br />
                    {member.name}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 mt-2">No people</p>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEditSection("family")}
            className="h-8 w-8"
          >
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      </Card>

      <Card className="p-4 bg-yellow-50 border-yellow-200">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">Investment dates</h3>
            {childData.investmentDetails ? (
              <p className="text-sm mt-2">
                ${childData.investmentDetails.amount} on the{" "}
                {childData.investmentDetails.frequency}
              </p>
            ) : (
              <p className="text-sm text-gray-500 mt-2">
                No date(s) or amount(s) set yet
              </p>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEditSection("investment")}
            className="h-8 w-8"
          >
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      </Card>

      <div className="pt-4">
        <Button
          onClick={onSave}
          className="w-full h-12 bg-green-500 hover:bg-green-600"
        >
          Save
        </Button>
      </div>
    </div>
  );
};
