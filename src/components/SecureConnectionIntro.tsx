
import React from "react";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

interface SecureConnectionIntroProps {
  type: "bank" | "crypto";
  onConnect: () => void;
}

export const SecureConnectionIntro: React.FC<SecureConnectionIntroProps> = ({
  type,
  onConnect,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">
          Connect your {type === "bank" ? "bank account" : "crypto account"}
        </h2>
        <p className="text-gray-600 text-sm">
          NestiFi uses Plaid to connect your {type === "bank" ? "bank" : "crypto"} account to provide you with all features.
        </p>
      </div>

      <div className="flex justify-center my-8">
        <div className="relative">
          <img
            src="/lovable-uploads/489f8a28-2dc5-4151-8e06-c7f8fda2c6a5.png"
            alt="Secure connection"
            className="w-48 h-48 object-contain"
          />
          <div className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg">
            <Shield className="h-8 w-8 text-green-500" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2 bg-green-50 p-3 rounded-md">
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
            <span className="text-green-600 font-bold">1</span>
          </div>
          <p className="text-sm">Connect in seconds</p>
        </div>
        <div className="flex items-center space-x-2 bg-green-50 p-3 rounded-md">
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
            <span className="text-green-600 font-bold">2</span>
          </div>
          <p className="text-sm">Keep your data safe</p>
        </div>
      </div>

      <div className="pt-4">
        <Button 
          onClick={onConnect} 
          className="w-full h-12 bg-green-500 hover:bg-green-600"
        >
          Connect securely
        </Button>
      </div>

      <p className="text-xs text-center text-gray-500">
        By continuing, you agree to our terms and conditions.
      </p>
    </div>
  );
};
