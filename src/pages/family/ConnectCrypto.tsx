
import React from "react";
import { useNavigate } from "react-router-dom";
import { MobileFrame } from "@/components/MobileFrame";
import { SecureConnectionIntro } from "@/components/SecureConnectionIntro";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const ConnectCrypto: React.FC = () => {
  const navigate = useNavigate();

  const handleConnect = () => {
    // Here we would typically initiate a connection to a crypto wallet
    // For this demo, we'll just navigate to the next step
    navigate("/family/connect-success");
  };

  return (
    <MobileFrame>
      <div className="flex flex-col h-full">
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/family/connect-choice")}
            className="mr-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Connect your crypto account</h1>
        </div>
        
        <div className="flex-1">
          <SecureConnectionIntro
            type="crypto"
            onConnect={handleConnect}
          />
        </div>
      </div>
    </MobileFrame>
  );
};

export default ConnectCrypto;
