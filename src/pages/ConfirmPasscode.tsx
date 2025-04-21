
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Keypad from "@/components/Keypad";
import { toast } from "@/components/ui/sonner";

const ConfirmPasscode = () => {
  const [passcode, setPasscode] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const originalPasscode = location.state?.passcode;

  useEffect(() => {
    // If no original passcode is found, go back to create passcode
    if (!originalPasscode) {
      navigate("/create-passcode");
    }
  }, [originalPasscode, navigate]);

  const handleKeyPress = (value: string) => {
    if (passcode.length < 6) {
      setPasscode(passcode + value);
    }
  };

  const handleBackspace = () => {
    if (passcode.length > 0) {
      setPasscode(passcode.slice(0, -1));
    }
  };

  useEffect(() => {
    if (passcode.length === 6) {
      if (passcode === originalPasscode) {
        setIsLoading(true);
        // Simulate API call to complete registration
        setTimeout(() => {
          toast.success("Registration successful!");
          navigate("/family/family-circle");
        }, 1000);
      } else {
        toast.error("Passcodes don't match. Please try again.");
        setPasscode("");
      }
    }
  }, [passcode, originalPasscode, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <div className="w-full max-w-md flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-8">Confirm passcode</h1>
        
        <div className="flex gap-3 mb-12">
          {Array(6).fill(0).map((_, index) => (
            <div 
              key={index} 
              className={`w-4 h-4 rounded-full ${
                index < passcode.length ? "bg-primary" : "bg-gray-200"
              }`}
            />
          ))}
        </div>
        
        <Keypad onKeyPress={handleKeyPress} onBackspace={handleBackspace} />
        
        <Button 
          variant="link" 
          onClick={() => navigate("/create-passcode")}
          className="mt-8"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default ConfirmPasscode;
