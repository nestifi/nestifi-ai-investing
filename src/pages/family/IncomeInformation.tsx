
import React from "react";
import { useNavigate } from "react-router-dom";
import { MobileFrame } from "@/components/MobileFrame";
import { IncomeInformationForm } from "@/components/IncomeInformationForm";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const IncomeInformation: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (data: any) => {
    // Here we would typically store the data in state management or API
    console.log("Income information:", data);
    navigate("/family/agreement");
  };

  return (
    <MobileFrame>
      <div className="flex flex-col h-full">
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/family/adult-details")}
            className="mr-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Income information</h1>
        </div>
        
        <div className="flex-1">
          <IncomeInformationForm 
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </MobileFrame>
  );
};

export default IncomeInformation;
