
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MobileFrame } from "@/components/MobileFrame";
import { PasscodeDots } from "@/components/PasscodeDots";
import { Keypad } from "@/components/Keypad";

const CreatePasscode: React.FC = () => {
  const navigate = useNavigate();
  const [passcode, setPasscode] = useState("");
  
  useEffect(() => {
    if (passcode.length === 6) {
      // Store the passcode in session storage for confirmation step
      sessionStorage.setItem("tempPasscode", passcode);
      
      // Navigate to confirm passcode screen after a short delay
      const timer = setTimeout(() => {
        navigate("/confirm-passcode");
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [passcode, navigate]);
  
  const handleKeyPress = (key: string) => {
    if (passcode.length < 6) {
      setPasscode(prev => prev + key);
    }
  };
  
  const handleDelete = () => {
    setPasscode(prev => prev.slice(0, -1));
  };

  return (
    <MobileFrame>
      <div className="flex flex-col h-full items-center pt-12">
        <h1 className="text-2xl font-bold text-gray-800 mb-3 text-center">
          Create passcode
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Set a 6-digit passcode to secure your account
        </p>
        
        <PasscodeDots length={6} filledCount={passcode.length} />
        
        <div className="flex justify-center w-full">
          <Keypad onKeyPress={handleKeyPress} onDelete={handleDelete} />
        </div>
      </div>
    </MobileFrame>
  );
};

export default CreatePasscode;
