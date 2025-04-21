
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MobileFrame } from "@/components/MobileFrame";

const countryCodes = [
  { code: "+1", country: "US" },
  { code: "+44", country: "UK" },
  { code: "+61", country: "AU" },
  { code: "+91", country: "IN" },
  { code: "+49", country: "DE" },
  { code: "+33", country: "FR" },
  { code: "+81", country: "JP" },
  { code: "+86", country: "CN" },
];

const PhoneNumber: React.FC = () => {
  const navigate = useNavigate();
  const [countryCode, setCountryCode] = useState("+1");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  // Validate form
  useEffect(() => {
    // Simple validation - at least 8 digits
    setIsFormValid(phoneNumber.length >= 8);
  }, [phoneNumber]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isFormValid) {
      // In a real app, this would call an API to send verification code
      console.log("Sending verification to", { countryCode, phoneNumber });
      navigate("/verify-phone");
    }
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow digits
    const value = e.target.value.replace(/[^\d]/g, "");
    setPhoneNumber(value);
  };

  return (
    <MobileFrame>
      <div className="flex flex-col h-full justify-between">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Enter your phone number
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone number</Label>
              <div className="flex gap-2">
                <Select
                  value={countryCode}
                  onValueChange={setCountryCode}
                >
                  <SelectTrigger className="w-24 h-12">
                    <SelectValue placeholder={countryCode} />
                  </SelectTrigger>
                  <SelectContent>
                    {countryCodes.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.code} {country.country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Input
                  id="phone"
                  type="tel"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  placeholder="Phone number"
                  className="h-12 flex-1"
                  required
                />
              </div>
              <p className="text-xs text-gray-500">
                We'll send you a verification code via SMS
              </p>
            </div>
            
            <Button 
              type="submit" 
              className="w-full h-12 bg-green-500 hover:bg-green-600"
              disabled={!isFormValid}
            >
              Continue
            </Button>
          </form>
        </div>
      </div>
    </MobileFrame>
  );
};

export default PhoneNumber;
