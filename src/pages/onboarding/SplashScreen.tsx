
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MobileFrame } from "@/components/MobileFrame";
import { NestiFiLogo } from "@/components/NestiFiLogo";

const SplashScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <MobileFrame>
      <div className="flex flex-col h-full justify-between">
        <div className="flex-1 flex flex-col items-center justify-center">
          <NestiFiLogo />
          
          <div className="mt-12 text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Build Your Nest Egg
            </h1>
            <div className="space-y-2 mb-6">
              <p className="text-gray-600">Add Your Close Ones</p>
              <p className="text-gray-600">Invite Friends and Family</p>
              <p className="text-gray-600">Share Expenses With Ease</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-3 px-4 mb-6">
          <Button 
            className="w-full h-12 bg-green-500 hover:bg-green-600"
            onClick={() => navigate("/onboarding-1")}
          >
            Create personal account
          </Button>
          <Button 
            variant="outline" 
            className="w-full h-12 border-green-500 text-green-500 hover:bg-green-50"
            onClick={() => navigate("/login")}
          >
            Log in
          </Button>
        </div>
      </div>
    </MobileFrame>
  );
};

export default SplashScreen;
