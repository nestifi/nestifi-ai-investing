
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MobileFrame } from "@/components/MobileFrame";
import { NestiFiLogo } from "@/components/NestiFiLogo";

const Index: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <MobileFrame>
      <div className="flex flex-col h-full items-center justify-center">
        <NestiFiLogo />
        
        <h1 className="text-2xl font-bold text-gray-800 mt-8 mb-4 text-center">
          Welcome to NestiFi
        </h1>
        <p className="text-gray-600 text-center mb-8">
          You've successfully completed the onboarding process and are now logged in.
        </p>
        
        <div className="w-full px-4">
          <Button 
            className="w-full h-12 bg-green-500 hover:bg-green-600"
            onClick={handleLogout}
          >
            Log out
          </Button>
        </div>
      </div>
    </MobileFrame>
  );
};

export default Index;
