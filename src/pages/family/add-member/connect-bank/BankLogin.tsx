
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Fingerprint, Lock } from "lucide-react";

const BankLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showBiometrics, setShowBiometrics] = useState(false);
  
  const selectedBankId = sessionStorage.getItem("selectedBankId") || "1";
  const bankName = getBankName(selectedBankId);
  
  function getBankName(id: string): string {
    const banks: Record<string, string> = {
      "1": "Chase",
      "2": "Bank of America",
      "3": "Wells Fargo",
      "4": "Citibank",
      "5": "Capital One"
    };
    return banks[id] || "Your Bank";
  }
  
  const handleLogin = () => {
    if (!username || !password) return;
    
    // Show biometrics prompt
    setShowBiometrics(true);
    
    // Simulate biometric authentication
    setTimeout(() => {
      navigate("/family/add-member/connect-bank/select-accounts");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-md mx-auto pt-8">
        <h1 className="text-2xl font-bold mb-6">Sign In to {bankName}</h1>
        <p className="text-gray-600 mb-6">
          Enter your credentials to securely connect your account
        </p>

        <Card className="mb-6">
          <CardContent className="p-6 space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
              />
            </div>
            
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>
            
            <Button 
              className="w-full py-6 bg-[#13ab6c]" 
              disabled={!username || !password}
              onClick={handleLogin}
            >
              Sign In
            </Button>
          </CardContent>
        </Card>
        
        {showBiometrics && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-80">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="h-16 w-16 rounded-full bg-[#13ab6c]/10 flex items-center justify-center">
                    <Fingerprint className="h-10 w-10 text-[#13ab6c]" />
                  </div>
                </div>
                <h3 className="text-lg font-medium mb-2">Authenticate</h3>
                <p className="text-gray-600 mb-4">
                  Verify your identity to continue
                </p>
                <div className="animate-pulse flex justify-center">
                  <Lock className="h-6 w-6 text-[#13ab6c]" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default BankLogin;
