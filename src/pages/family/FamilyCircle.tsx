
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MobileFrame } from "@/components/MobileFrame";
import { Button } from "@/components/ui/button";
import { ArrowLeft, X } from "lucide-react";

const FamilyCircle: React.FC = () => {
  const navigate = useNavigate();
  const [children, setChildren] = useState([
    {
      id: "1",
      name: "Dan Williams",
      dob: "18/02/2017",
      profileImage: null,
    }
  ]);

  const handleAddChild = () => {
    navigate("/family/child-details-add");
  };

  const handleContinue = () => {
    navigate("/family/investment-options");
  };

  return (
    <MobileFrame>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold flex-1 text-center">Family Circle</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/family/add-child")}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="flex-1">
          <div className="space-y-4 mb-6">
            {children.map(child => (
              <div key={child.id} className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-lg font-bold text-green-500">
                    {child.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="font-medium">{child.name}</h3>
                  <p className="text-sm text-gray-500">{child.dob}</p>
                </div>
              </div>
            ))}
          </div>
          
          <Button 
            variant="outline"
            onClick={handleAddChild}
            className="w-full mb-4"
          >
            Add child
          </Button>
          
          <Button 
            onClick={handleContinue}
            className="w-full h-12 bg-green-500 hover:bg-green-600"
          >
            Continue
          </Button>
        </div>
      </div>
    </MobileFrame>
  );
};

export default FamilyCircle;
