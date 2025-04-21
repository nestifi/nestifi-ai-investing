
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { QrCode, Fingerprint } from "lucide-react";

const WalletLogin = () => {
  const navigate = useNavigate();
  const [connecting, setConnecting] = useState(false);
  
  const selectedWalletId = sessionStorage.getItem("selectedWalletId") || "1";
  const walletName = getWalletName(selectedWalletId);
  
  function getWalletName(id: string): string {
    const wallets: Record<string, string> = {
      "1": "MetaMask",
      "2": "Coinbase Wallet",
      "3": "Trust Wallet",
      "4": "Ledger",
      "5": "Rainbow"
    };
    return wallets[id] || "Your Wallet";
  }
  
  // Simulate wallet connection
  useEffect(() => {
    if (connecting) {
      const timer = setTimeout(() => {
        navigate("/family/add-member/connect-crypto/select-assets");
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [connecting, navigate]);
  
  const handleConnect = () => {
    setConnecting(true);
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-md mx-auto pt-8">
        <h1 className="text-2xl font-bold mb-6">Connect {walletName}</h1>
        <p className="text-gray-600 mb-6">
          Scan the QR code with your wallet app or click connect
        </p>

        <div className="flex justify-center mb-8">
          <div className="w-64 h-64 border-2 border-gray-300 rounded-lg p-2">
            <div className="bg-white w-full h-full flex items-center justify-center">
              <QrCode className="h-48 w-48 text-gray-800" />
            </div>
          </div>
        </div>

        <Button 
          className="w-full py-6 bg-[#13ab6c] mb-4"
          onClick={handleConnect}
          disabled={connecting}
        >
          {connecting ? "Connecting..." : "Connect Wallet"}
        </Button>
        
        {connecting && (
          <Card className="overflow-hidden mb-4">
            <CardContent className="p-4 text-center">
              <div className="flex justify-center mb-2">
                <div className="animate-pulse">
                  <Fingerprint className="h-8 w-8 text-[#13ab6c]" />
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Approve the connection request in your {walletName} app
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default WalletLogin;
