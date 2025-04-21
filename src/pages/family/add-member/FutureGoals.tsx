
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";
import { toast } from "@/components/ui/sonner";

interface Goal {
  id: string;
  name: string;
  icon: string;
  selected: boolean;
}

const FutureGoals = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  const [goals, setGoals] = useState<Goal[]>([
    { id: "1", name: "College", icon: "🎓", selected: false },
    { id: "2", name: "First Car", icon: "🚗", selected: false },
    { id: "3", name: "House", icon: "🏠", selected: false },
    { id: "4", name: "Travel", icon: "✈️", selected: false },
    { id: "5", name: "Business", icon: "💼", selected: false },
    { id: "6", name: "Wedding", icon: "💍", selected: false },
  ]);
  
  const toggleGoal = (goalId: string) => {
    setGoals(goals.map(goal => 
      goal.id === goalId ? { ...goal, selected: !goal.selected } : goal
    ));
  };
  
  const areGoalsSelected = goals.some(goal => goal.selected);
  
  const handleSave = () => {
    const selectedGoals = goals.filter(goal => goal.selected);
    
    // In a real app, you would save these goals to storage or API
    toast.success("Goals saved successfully");
    navigate(`/family/add-member/child-profile/${id}`);
  };
  
  const handleCancel = () => {
    navigate(`/family/add-member/child-profile/${id}`);
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-md mx-auto pt-8">
        <h1 className="text-2xl font-bold mb-6">Future Goals</h1>
        <p className="text-gray-600 mb-8">
          Select financial goals for this child's future
        </p>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {goals.map((goal) => (
            <Card 
              key={goal.id}
              className={`cursor-pointer overflow-hidden border-2 ${
                goal.selected ? "border-[#13ab6c]" : "border-gray-200"
              }`}
              onClick={() => toggleGoal(goal.id)}
            >
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <div className="text-4xl mb-2">{goal.icon}</div>
                <h3 className="font-medium">{goal.name}</h3>
                {goal.selected && (
                  <div className="absolute top-2 right-2">
                    <Check className="h-4 w-4 text-[#13ab6c]" />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-3">
          <Button 
            className="w-full py-6 bg-[#13ab6c]" 
            disabled={!areGoalsSelected}
            onClick={handleSave}
          >
            Save
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full py-6" 
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FutureGoals;
