
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold mb-4">Welcome to NestiFi</h1>
        <p className="text-xl text-gray-600 mb-8">Your family finance platform</p>
        
        <div className="space-y-4">
          <Button 
            className="w-full"
            onClick={() => navigate("/create-passcode")}
          >
            Create Passcode
          </Button>
          
          <Button 
            className="w-full"
            onClick={() => navigate("/family/family-circle")}
          >
            Family Circle
          </Button>
          
          <Button 
            className="w-full"
            onClick={() => navigate("/family/investment-options")}
          >
            Investment Options
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
