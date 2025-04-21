
import React from "react";
import { useNavigate } from "react-router-dom";
import { MobileFrame } from "@/components/MobileFrame";
import { ConnectAccountChoice } from "@/components/ConnectAccountChoice";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const ConnectChoice: React.FC = () => {
  const navigate = useNavigate();

  const handleContinue = (type: "bank" | "crypto" | "skip") => {
    if (type === "bank") {
      navigate("/family/connect-bank");
    } else if (type === "crypto") {
      navigate("/family/connect-crypto");
    } else {
      navigate("/family/add-child");
    }
  };

  return (
    <MobileFrame>
      <div className="flex flex-col h-full">
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/family/agreement")}
            className="mr-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Connect your account</h1>
        </div>
        
        <div className="flex-1">
          <ConnectAccountChoice 
            onContinue={handleContinue}
          />
        </div>
      </div>
    </MobileFrame>
  );
};

export default ConnectChoice;
