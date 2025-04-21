
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Wallet {
  id: string;
  name: string;
  logo?: string;
  description?: string;
}

const SelectWallet = () => {
  const navigate = useNavigate();
  
  const wallets: Wallet[] = [
    { id: "1", name: "MetaMask", logo: "/placeholder.svg" },
    { id: "2", name: "Coinbase Wallet", logo: "/placeholder.svg" },
    { id: "3", name: "Trust Wallet", logo: "/placeholder.svg" },
    { id: "4", name: "Ledger", logo: "/placeholder.svg" },
    { id: "5", name: "Rainbow", logo: "/placeholder.svg" },
    {
      id: "keplr",
      name: "Keplr Wallet (Cosmos/IBC)",
      logo: "https://assets.keplr.app/keplr-icon.png", // Official Keplr logo
      description: "Connect Cosmos/IBC assets. $NESTIFI coming soon!"
    },
  ];

  const handleSelectWallet = (walletId: string) => {
    // Store selected wallet in session storage
    sessionStorage.setItem("selectedWalletId", walletId);
    navigate("/family/add-member/connect-crypto/wallet-login");
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-md mx-auto pt-8">
        <h1 className="text-2xl font-bold mb-6">Select Your Wallet</h1>
        <p className="text-gray-600 mb-6">
          Choose which crypto wallet you want to connect
        </p>

        <div className="space-y-3 mb-6">
          {wallets.map((wallet) => (
            <Card 
              key={wallet.id} 
              className="cursor-pointer hover:border-[#13ab6c]"
              onClick={() => handleSelectWallet(wallet.id)}
            >
              <CardContent className="p-4 flex items-center">
                <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center mr-4 overflow-hidden">
                  {wallet.logo && (
                    <img 
                      src={wallet.logo} 
                      alt={wallet.name} 
                      className="h-8 w-8 object-contain"
                    />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{wallet.name}</h3>
                  {wallet.description && (
                    <span className="text-xs text-gray-500">{wallet.description}</span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectWallet;

