
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { MobileFrame } from "@/components/MobileFrame";
import { PasscodeDots } from "@/components/PasscodeDots";
import { Keypad } from "@/components/Keypad";

const ConfirmPasscode: React.FC = () => {
  const navigate = useNavigate();
  const [passcode, setPasscode] = useState("");
  const [originalPasscode, setOriginalPasscode] = useState("");
  const [isMatching, setIsMatching] = useState<boolean | null>(null);
  
  useEffect(() => {
    // Retrieve the original passcode from session storage
    const storedPasscode = sessionStorage.getItem("tempPasscode");
    if (!storedPasscode) {
      // If for some reason we don't have the original passcode, go back to create passcode
      navigate("/create-passcode");
      return;
    }
    setOriginalPasscode(storedPasscode);
  }, [navigate]);
  
  useEffect(() => {
    if (passcode.length === 6) {
      if (passcode === originalPasscode) {
        setIsMatching(true);
        // In a real app, this would call an API to complete registration
        // and store the hashed passcode securely
        
        // Simulate API call
        setTimeout(() => {
          // Clear temporary passcode from session storage
          sessionStorage.removeItem("tempPasscode");
          
          // Show success toast
          toast({
            title: "Registration complete!",
            description: "Your account has been created successfully.",
          });
          
          // Navigate to home
          navigate("/home");
        }, 500);
      } else {
        setIsMatching(false);
        // Clear the passcode after showing error
        setTimeout(() => {
          setPasscode("");
          setIsMatching(null);
        }, 1000);
      }
    }
  }, [passcode, originalPasscode, navigate]);
  
  const handleKeyPress = (key: string) => {
    if (passcode.length < 6) {
      setPasscode(prev => prev + key);
    }
  };
  
  const handleDelete = () => {
    setPasscode(prev => prev.slice(0, -1));
    // Reset matching status when user is changing input
    if (isMatching !== null) {
      setIsMatching(null);
    }
  };

  return (
    <MobileFrame>
      <div className="flex flex-col h-full items-center pt-12">
        <h1 className="text-2xl font-bold text-gray-800 mb-3 text-center">
          Confirm passcode
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Enter your passcode again to confirm
        </p>
        
        <PasscodeDots 
          length={6} 
          filledCount={passcode.length} 
        />
        
        {isMatching === false && (
          <p className="text-red-500 font-medium mt-4 mb-6">
            Passcodes don't match. Try again.
          </p>
        )}
        
        <div className="flex justify-center w-full">
          <Keypad onKeyPress={handleKeyPress} onDelete={handleDelete} />
        </div>
      </div>
    </MobileFrame>
  );
};

export default ConfirmPasscode;
