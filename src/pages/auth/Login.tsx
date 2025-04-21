
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { MobileFrame } from "@/components/MobileFrame";
import { SocialButtons } from "@/components/SocialButtons";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  // Validate form
  useEffect(() => {
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isValidPassword = password.length >= 1; // Any password is fine for login validation
    setIsFormValid(isValidEmail && isValidPassword);
  }, [email, password]);

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
    // In a real implementation, this would trigger Google OAuth
    alert("Google login functionality would be implemented here");
  };

  const handleAppleLogin = () => {
    console.log("Apple login clicked");
    // In a real implementation, this would trigger Apple OAuth
    alert("Apple login functionality would be implemented here");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isFormValid) {
      // In a real app, this would authenticate with an API
      console.log("Logging in with", { email, password });
      // For demo, just navigate to the home page
      navigate("/home");
    }
  };

  return (
    <MobileFrame>
      <div className="flex flex-col h-full justify-between">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Log in to start using NestiFi
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6 mb-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="h-12"
                required
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="password">Password</Label>
                <button
                  type="button"
                  className="text-green-500 text-sm font-medium hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="h-12 pr-10"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full h-12 bg-green-500 hover:bg-green-600"
              disabled={!isFormValid}
            >
              Log in
            </Button>
          </form>
          
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>
          
          <SocialButtons 
            onGoogleClick={handleGoogleLogin} 
            onAppleClick={handleAppleLogin} 
          />
        </div>
        
        <div className="text-center mb-6">
          <button
            className="text-green-500 font-medium hover:underline"
            onClick={() => navigate("/signup-options")}
          >
            Don't have an account? Sign up
          </button>
        </div>
      </div>
    </MobileFrame>
  );
};

export default Login;
