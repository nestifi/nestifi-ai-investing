
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MobileFrame } from "@/components/MobileFrame";
import { VerificationInput } from "@/components/VerificationInput";

const VerifyPhone: React.FC = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [isResending, setIsResending] = useState(false);

  const handleVerify = () => {
    // In a real app, this would verify the code with an API
    console.log("Verifying SMS code:", code);
    navigate("/create-passcode");
  };

  const handleResendCode = () => {
    setIsResending(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Resending verification code");
      setIsResending(false);
      alert("A new verification code has been sent to your phone");
    }, 1500);
  };

  return (
    <MobileFrame>
      <div className="flex flex-col h-full justify-between">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-800 mb-3 text-center">
            Verify your phone number
          </h1>
          <p className="text-gray-600 text-center mb-8">
            We've sent a 6-digit verification code to your phone. Enter the code below to continue.
          </p>
          
          <div className="flex justify-center mb-8">
            <VerificationInput 
              length={6} 
              onChange={setCode} 
            />
          </div>
          
          <Button 
            className="w-full h-12 bg-green-500 hover:bg-green-600 mb-6"
            disabled={code.length !== 6}
            onClick={handleVerify}
          >
            Verify
          </Button>
          
          <div className="text-center">
            <button
              className="text-green-500 font-medium hover:underline disabled:opacity-50 disabled:hover:no-underline"
              onClick={handleResendCode}
              disabled={isResending}
            >
              {isResending ? "Sending..." : "Resend code"}
            </button>
          </div>
        </div>
      </div>
    </MobileFrame>
  );
};

export default VerifyPhone;
