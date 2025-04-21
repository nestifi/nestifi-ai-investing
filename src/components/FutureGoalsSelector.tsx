
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface FutureGoalsSelectorProps {
  selectedGoals: string[];
  onSave: (goals: string[]) => void;
  onCancel: () => void;
}

export const FutureGoalsSelector: React.FC<FutureGoalsSelectorProps> = ({
  selectedGoals: initialGoals,
  onSave,
  onCancel,
}) => {
  const [selectedGoals, setSelectedGoals] = useState<string[]>(initialGoals || []);

  const goals = [
    { id: "college", label: "College", image: "/lovable-uploads/7b2b4e4b-32f6-4d24-9c1c-b9a55f50baf9.png" },
    { id: "travel", label: "Travel", image: "/lovable-uploads/da83120a-967e-46bf-8a89-3717dbc8d282.png" },
    { id: "wedding", label: "Wedding", image: "/lovable-uploads/9417a1dc-d365-4242-a700-a31c44e5887d.png" },
    { id: "house", label: "House", image: "/lovable-uploads/9417a1dc-d365-4242-a700-a31c44e5887d.png" },
    { id: "dreams", label: "Dreams", image: "/lovable-uploads/9417a1dc-d365-4242-a700-a31c44e5887d.png" },
    { id: "car", label: "Car", image: "/lovable-uploads/9417a1dc-d365-4242-a700-a31c44e5887d.png" }
  ];

  const toggleGoal = (goalId: string) => {
    if (selectedGoals.includes(goalId)) {
      setSelectedGoals(selectedGoals.filter(id => id !== goalId));
    } else {
      setSelectedGoals([...selectedGoals, goalId]);
    }
  };

  const handleSave = () => {
    onSave(selectedGoals);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Future goals</h2>
        <p className="text-gray-600 text-sm">
          Choose Dan's future goals you want to save for.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {goals.map(goal => (
          <div key={goal.id} className="flex flex-col items-center">
            <Card 
              className={`w-full h-32 overflow-hidden cursor-pointer border-2 ${
                selectedGoals.includes(goal.id) ? 'border-green-500' : 'border-gray-200'
              }`}
              onClick={() => toggleGoal(goal.id)}
            >
              <div className="h-full">
                <img 
                  src={goal.image} 
                  alt={goal.label}
                  className="w-full h-full object-cover"
                />
              </div>
            </Card>
            <span className="mt-1 text-sm font-medium">{goal.label}</span>
          </div>
        ))}
      </div>

      <div className="flex space-x-3 pt-4">
        <Button 
          variant="outline" 
          onClick={onCancel} 
          className="flex-1 h-12"
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSave} 
          className="flex-1 h-12 bg-green-500 hover:bg-green-600"
          disabled={selectedGoals.length === 0}
        >
          Save
        </Button>
      </div>
    </div>
  );
};
