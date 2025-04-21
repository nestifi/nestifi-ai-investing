
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const ConnectionSuccess = () => {
  const navigate = useNavigate();
  
  const handleContinue = () => {
    navigate("/family/add-member/family-circle-intro");
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-md mx-auto pt-8">
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="h-24 w-24 rounded-full bg-[#13ab6c]/10 flex items-center justify-center mb-6">
            <CheckCircle className="h-12 w-12 text-[#13ab6c]" />
          </div>
          
          <h1 className="text-2xl font-bold mb-4 text-center">Connection Successful!</h1>
          <p className="text-gray-600 text-center mb-4">
            Your accounts have been successfully connected to NestiFi
          </p>
        </div>

        <Button 
          className="w-full py-6 bg-[#13ab6c]"
          onClick={handleContinue}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default ConnectionSuccess;
