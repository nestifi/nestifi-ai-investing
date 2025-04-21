
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const DepositSuccess = () => {
  const navigate = useNavigate();
  
  const handleDone = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-md mx-auto pt-16 flex flex-col items-center justify-center">
        <div className="h-24 w-24 rounded-full bg-[#13ab6c]/10 flex items-center justify-center mb-8">
          <CheckCircle className="h-12 w-12 text-[#13ab6c]" />
        </div>
          
        <h1 className="text-2xl font-bold mb-3 text-center">Gift Sent Successfully!</h1>
        <p className="text-gray-600 text-center mb-8">
          Your gift has been successfully sent to the recipient
        </p>

        <Button 
          className="w-full py-6 bg-[#13ab6c]"
          onClick={handleDone}
        >
          Done
        </Button>
      </div>
    </div>
  );
};

export default DepositSuccess;
