
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MobileFrame } from "@/components/MobileFrame";
import { AccountTypeSelector } from "@/components/AccountTypeSelector";

const ChooseAccountType: React.FC = () => {
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState<"adult" | "child" | null>(null);

  const handleContinue = () => {
    if (accountType === "adult") {
      navigate("/family/adult-details");
    } else if (accountType === "child") {
      navigate("/family/child-details");
    }
  };

  return (
    <MobileFrame>
      <div className="flex flex-col h-full justify-between">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-center mb-6">
            Choose your account type
          </h1>
          
          <AccountTypeSelector 
            selectedType={accountType} 
            onSelect={setAccountType} 
          />
        </div>
        
        <div className="mb-6">
          <Button 
            className="w-full h-12 bg-green-500 hover:bg-green-600"
            onClick={handleContinue}
            disabled={!accountType}
          >
            Continue
          </Button>
        </div>
      </div>
    </MobileFrame>
  );
};

export default ChooseAccountType;
