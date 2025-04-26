import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
const SplashScreen = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // Auto-navigate is now optional, managed by buttons
  }, [navigate]);
  const handleCreateAccount = () => {
    navigate("/onboarding");
  };
  const handleLogin = () => {
    navigate("/auth/login");
  };
  return <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      <div className="mb-8" style={{
      marginTop: "60px"
    }} />
      <img alt="Nestifi Logo" className="w-36 h-36 mx-auto mb-4" style={{
      objectFit: "contain"
    }} src="/lovable-uploads/eb956725-3730-4073-b2c6-5862d9b84cde.jpg" />
      <h1 className="text-4xl text-[#13ab6c] text-center font-semibold mb-2">
        NestiFi
      </h1>
      <p className="text-gray-500 text-xl text-center mb-14">
        Investing Made Simple for Families
      </p>
      
      <div className="w-full max-w-md space-y-4 mb-10">
        <Button onClick={handleCreateAccount} className="w-full py-6 bg-[#13ab6c]">
          Create personal account
        </Button>
        
        <Button onClick={handleLogin} variant="outline" className="w-full py-6 border-[#13ab6c] text-[#13ab6c]">
          Log in
        </Button>
      </div>
    </div>;
};
export default SplashScreen;