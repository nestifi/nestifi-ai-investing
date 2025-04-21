
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";

const PhoneInput = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+1");
  const [isLoading, setIsLoading] = useState(false);

  const isValidPhone = () => {
    // Simple validation - ensure there's some content after country code
    return phone.trim().length > 3;
  };

  const handleContinue = () => {
    if (!isValidPhone()) return;
    
    setIsLoading(true);
    // Store phone number for verification screen
    sessionStorage.setItem("signupPhone", `${countryCode}${phone}`);
    
    // Simulate API call to send SMS
    setTimeout(() => {
      setIsLoading(false);
      navigate("/auth/verify-phone");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-6 py-12">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-8">Enter your phone number</h1>

        <div className="flex gap-3 mb-8">
          <div className="w-20">
            <Label htmlFor="countryCode">Code</Label>
            <Input
              id="countryCode"
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="text-center"
            />
          </div>
          
          <div className="flex-1">
            <Label htmlFor="phone">Phone number</Label>
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Your phone number"
              type="tel"
              autoComplete="tel"
            />
          </div>
        </div>

        <Button
          onClick={handleContinue}
          className="w-full py-6"
          disabled={!isValidPhone() || isLoading}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default PhoneInput;
