
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, CreditCard } from "lucide-react";

interface ConnectAccountChoiceProps {
  onContinue: (type: "bank" | "crypto" | "skip") => void;
}

export const ConnectAccountChoice: React.FC<ConnectAccountChoiceProps> = ({
  onContinue,
}) => {
  const [selectedType, setSelectedType] = useState<"bank" | "crypto" | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Connect your account</h2>
        <p className="text-gray-600 text-sm">
          Choose how you'd like to connect. It's a secure step to personalize your experience.
        </p>
      </div>

      <div className="space-y-4">
        <Card 
          className={`p-4 cursor-pointer border-2 ${
            selectedType === "bank" ? "border-green-500 bg-green-50" : "border-gray-200"
          }`}
          onClick={() => setSelectedType("bank")}
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <CreditCard className="h-5 w-5 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">Bank account</h3>
              <p className="text-sm text-gray-600">
                8000+ apps trust Plaid to quickly connect to financial institutions. Third-party bank-to-data encryption to help protect your data.
              </p>
            </div>
          </div>
        </Card>

        <Card 
          className={`p-4 cursor-pointer border-2 ${
            selectedType === "crypto" ? "border-green-500 bg-green-50" : "border-gray-200"
          }`}
          onClick={() => setSelectedType("crypto")}
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Wallet className="h-5 w-5 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">Crypto wallet</h3>
              <p className="text-sm text-gray-600">
                Plug into over 200 different self-custody crypto wallets through a single integration, including MetaMask, Rainbow, Trust Wallet etc.
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="space-y-3 pt-4">
        <Button 
          onClick={() => onContinue(selectedType || "skip")} 
          className="w-full h-12 bg-green-500 hover:bg-green-600"
          disabled={!selectedType}
        >
          Continue
        </Button>

        <Button 
          variant="link" 
          onClick={() => onContinue("skip")} 
          className="w-full text-green-500"
        >
          Skip for now
        </Button>
      </div>
    </div>
  );
};
