
import React from "react";
import { useNavigate } from "react-router-dom";
import { MobileFrame } from "@/components/MobileFrame";
import { PersonalDetailsForm } from "@/components/PersonalDetailsForm";
import { ArrowLeft, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const ChildDetailsAdd: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (data: any) => {
    // Here we would typically store the data in state management or API
    console.log("Child details:", data);
    navigate("/family/family-circle");
  };

  return (
    <MobileFrame>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/family/add-child")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold flex-1 text-center">Child's Details</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/family/add-child")}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="flex-1">
          <p className="text-gray-600 mb-6">
            Add personal information of the child you want to invest in.
          </p>
          
          <PersonalDetailsForm 
            accountType="child"
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </MobileFrame>
  );
};

export default ChildDetailsAdd;
