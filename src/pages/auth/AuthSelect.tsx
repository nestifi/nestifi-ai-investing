
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mail, Lock } from "lucide-react";

const AuthSelect = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailSignup = () => {
    navigate("/auth/signup");
  };

  const handleLogin = () => {
    navigate("/auth/login");
  };

  const handleSocialSignup = (provider: 'google' | 'apple') => {
    setIsLoading(true);
    // In a real app, we would initiate the OAuth flow here
    setTimeout(() => {
      setIsLoading(false);
      // For demo purposes, we'll just navigate to the signup success page
      navigate("/auth/signup-success");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-6 py-12">
      <div className="w-full max-w-md flex flex-col items-center">
        <h1 className="text-2xl font-semibold text-center mb-10">
          Sign up to start using NestiFi
        </h1>

        <div className="w-full space-y-4 mb-4">
          <Button
            variant="outline"
            className="w-full py-6 justify-center text-base font-medium"
            onClick={() => handleSocialSignup('google')}
            disabled={isLoading}
          >
            <img 
              src="/public/lovable-uploads/google-icon.png" 
              alt="Google" 
              className="w-5 h-5 mr-3"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            Continue with Google
          </Button>

          <Button
            variant="outline"
            className="w-full py-6 justify-center text-base font-medium"
            onClick={() => handleSocialSignup('apple')}
            disabled={isLoading}
          >
            <img 
              src="/public/lovable-uploads/apple-icon.png" 
              alt="Apple" 
              className="w-5 h-5 mr-3"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            Continue with Apple
          </Button>

          <Button
            variant="outline"
            className="w-full py-6 justify-center text-base font-medium"
            onClick={handleEmailSignup}
            disabled={isLoading}
          >
            <Mail className="mr-3" />
            Sign up with email
          </Button>
        </div>

        <div className="w-full flex justify-center">
          <Button variant="link" onClick={handleLogin} className="text-green-600">
            Log in to existing account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuthSelect;
