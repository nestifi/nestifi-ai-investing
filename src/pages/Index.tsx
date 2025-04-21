
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MobileFrame } from "@/components/MobileFrame";
import { NestiFiLogo } from "@/components/NestiFiLogo";

const Index: React.FC = () => {
  const navigate = useNavigate();

  return (
    <MobileFrame>
      <div className="flex flex-col h-full">
        <div className="flex justify-center py-6">
          <NestiFiLogo />
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold text-center mb-6">
            Welcome to NestiFi
          </h1>
          
          <div className="space-y-4 w-full max-w-xs">
            <Button 
              className="w-full h-12 bg-green-500 hover:bg-green-600"
              onClick={() => navigate("/family/choose-account-type")}
            >
              Add Family Member
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full h-12 border-green-500 text-green-500 hover:bg-green-50"
              onClick={() => navigate("/family/connect-choice")}
            >
              Connect Account
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full h-12 border-green-500 text-green-500 hover:bg-green-50"
              onClick={() => navigate("/family/investment-options")}
            >
              Manage Investments
            </Button>
          </div>
        </div>
      </div>
    </MobileFrame>
  );
};

export default Index;
