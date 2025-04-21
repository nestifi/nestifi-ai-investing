
import React from "react";
import { useNavigate } from "react-router-dom";
import { MobileFrame } from "@/components/MobileFrame";
import { Button } from "@/components/ui/button";
import { Check, ShieldCheck } from "lucide-react";

const ConnectSuccess: React.FC = () => {
  const navigate = useNavigate();

  return (
    <MobileFrame>
      <div className="flex flex-col h-full justify-between">
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <Check className="h-10 w-10 text-green-600" />
          </div>
          
          <h1 className="text-2xl font-bold text-center mb-4">Success</h1>
          
          <p className="text-gray-600 text-center mb-8">
            Your account is now securely linked to NestiFi. You're ready to start investing!
          </p>
          
          <div className="flex justify-center my-8">
            <div className="relative">
              <img
                src="/lovable-uploads/489f8a28-2dc5-4151-8e06-c7f8fda2c6a5.png"
                alt="Secure connection"
                className="w-48 h-48 object-contain"
              />
              <div className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg">
                <ShieldCheck className="h-8 w-8 text-green-500" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <Button 
            className="w-full h-12 bg-green-500 hover:bg-green-600"
            onClick={() => navigate("/family/add-child")}
          >
            Continue
          </Button>
        </div>
      </div>
    </MobileFrame>
  );
};

export default ConnectSuccess;
