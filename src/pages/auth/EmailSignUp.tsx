
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { MobileFrame } from "@/components/MobileFrame";

const EmailSignUp: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  // Validate form
  useEffect(() => {
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isValidPassword = password.length >= 8;
    setIsFormValid(isValidEmail && isValidPassword);
  }, [email, password]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isFormValid) {
      // In a real app, this would call an API to create the account
      console.log("Creating account with", { email, password });
      navigate("/verify-email");
    }
  };

  return (
    <MobileFrame>
      <div className="flex flex-col h-full justify-between">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Sign up to start using NestiFi
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
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
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
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
              <p className="text-xs text-gray-500">
                Password must be at least 8 characters long
              </p>
            </div>
            
            <Button 
              type="submit" 
              className="w-full h-12 bg-green-500 hover:bg-green-600"
              disabled={!isFormValid}
            >
              Create account
            </Button>
          </form>
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

export default EmailSignUp;
