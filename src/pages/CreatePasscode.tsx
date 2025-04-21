
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Keypad from "@/components/Keypad";

const CreatePasscode = () => {
  const [passcode, setPasscode] = useState<string>("");
  const navigate = useNavigate();

  const handleKeyPress = (value: string) => {
    if (passcode.length < 6) {
      const newPasscode = passcode + value;
      setPasscode(newPasscode);
      
      if (newPasscode.length === 6) {
        // Automatically navigate to confirm passcode after 6 digits
        setTimeout(() => {
          navigate("/confirm-passcode", { state: { passcode: newPasscode } });
        }, 500);
      }
    }
  };

  const handleBackspace = () => {
    if (passcode.length > 0) {
      setPasscode(passcode.slice(0, -1));
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <div className="w-full max-w-md flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-8">Create passcode</h1>
        
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
          onClick={() => navigate("/")}
          className="mt-8"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default CreatePasscode;
