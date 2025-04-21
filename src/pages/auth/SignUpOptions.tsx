
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MobileFrame } from "@/components/MobileFrame";
import { SocialButtons } from "@/components/SocialButtons";

const SignUpOptions: React.FC = () => {
  const navigate = useNavigate();

  const handleGoogleSignUp = () => {
    console.log("Google sign up clicked");
    // In a real implementation, this would trigger Google OAuth
    // For now, we'll just show a toast
    alert("Google sign up functionality would be implemented here");
  };

  const handleAppleSignUp = () => {
    console.log("Apple sign up clicked");
    // In a real implementation, this would trigger Apple OAuth
    // For now, we'll just show a toast
    alert("Apple sign up functionality would be implemented here");
  };

  return (
    <MobileFrame>
      <div className="flex flex-col h-full justify-between">
        <div className="flex-1 flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            Sign up to start using NestiFi
          </h1>
          
          <div className="w-full px-4 space-y-6">
            <SocialButtons 
              onGoogleClick={handleGoogleSignUp} 
              onAppleClick={handleAppleSignUp} 
            />
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full h-12 border-green-500 text-green-500 hover:bg-green-50"
              onClick={() => navigate("/signup-email")}
            >
              Sign up with email
            </Button>
          </div>
        </div>
        
        <div className="text-center mb-6">
          <button
            className="text-green-500 font-medium hover:underline"
            onClick={() => navigate("/login")}
          >
            Log in to existing account
          </button>
        </div>
      </div>
    </MobileFrame>
  );
};

export default SignUpOptions;
