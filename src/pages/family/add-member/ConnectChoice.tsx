
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Wallet, CreditCard } from "lucide-react";

const ConnectChoice = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<"bank" | "crypto" | null>(null);

  const handleContinue = () => {
    if (selectedOption === "bank") {
      navigate("/family/add-member/connect-bank/secure");
    } else if (selectedOption === "crypto") {
      navigate("/family/add-member/connect-crypto/secure");
    }
  };

  const handleSkip = () => {
    navigate("/family/add-member/family-circle-intro");
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-md mx-auto pt-8">
        <h1 className="text-2xl font-bold mb-6">Connect an Account</h1>
        <p className="text-gray-600 mb-8">
          Choose an account type to connect with NestiFi
        </p>

        <div className="space-y-4 mb-8">
          <Card 
            className={`cursor-pointer overflow-hidden border-2 ${
              selectedOption === "bank" ? "border-[#13ab6c]" : "border-gray-200"
            }`}
            onClick={() => setSelectedOption("bank")}
          >
            <CardContent className="p-4 flex items-center">
              <div className="h-10 w-10 bg-[#13ab6c]/10 rounded-full flex items-center justify-center mr-4">
                <CreditCard className="h-5 w-5 text-[#13ab6c]" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Connect bank</h3>
                <p className="text-sm text-gray-500">Link checking, savings, or investment accounts</p>
              </div>
              {selectedOption === "bank" && (
                <Check className="h-5 w-5 text-[#13ab6c]" />
              )}
            </CardContent>
          </Card>

          <Card 
            className={`cursor-pointer overflow-hidden border-2 ${
              selectedOption === "crypto" ? "border-[#13ab6c]" : "border-gray-200"
            }`}
            onClick={() => setSelectedOption("crypto")}
          >
            <CardContent className="p-4 flex items-center">
              <div className="h-10 w-10 bg-[#13ab6c]/10 rounded-full flex items-center justify-center mr-4">
                <Wallet className="h-5 w-5 text-[#13ab6c]" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Connect crypto wallet</h3>
                <p className="text-sm text-gray-500">Link your crypto wallet and assets</p>
              </div>
              {selectedOption === "crypto" && (
                <Check className="h-5 w-5 text-[#13ab6c]" />
              )}
            </CardContent>
          </Card>
        </div>

        <Button 
          className="w-full py-6 bg-[#13ab6c] mb-4" 
          disabled={!selectedOption}
          onClick={handleContinue}
        >
          Continue
        </Button>

        <Button 
          variant="outline" 
          className="w-full py-6 border-[#13ab6c] text-[#13ab6c]"
          onClick={handleSkip}
        >
          Skip for now
        </Button>
      </div>
    </div>
  );
};

export default ConnectChoice;
