
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const BankSecure = () => {
  const navigate = useNavigate();
  
  const handleConnect = () => {
    navigate("/family/add-member/connect-bank/select-institution");
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-md mx-auto pt-8">
        <h1 className="text-2xl font-bold mb-6">Connect Bank Securely</h1>
        <p className="text-gray-600 mb-8">
          Your security is our priority. We use bank-level encryption to keep your information safe.
        </p>

        <div className="flex justify-center mb-8">
          <div className="w-64 h-64 bg-[#13ab6c]/10 rounded-full flex items-center justify-center">
            <img 
              src="/placeholder.svg" 
              alt="Secure connection" 
              className="w-40 h-40"
            />
          </div>
        </div>

        <div className="space-y-6">
          <Button 
            className="w-full py-6 bg-[#13ab6c]" 
            onClick={handleConnect}
          >
            Connect securely
          </Button>
          
          <p className="text-center text-sm text-gray-500">
            By continuing, you agree to our{" "}
            <a href="#" className="text-[#13ab6c] inline-flex items-center">
              Terms of Service
              <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BankSecure;
