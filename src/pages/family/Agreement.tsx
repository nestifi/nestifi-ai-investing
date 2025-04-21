
import React from "react";
import { useNavigate } from "react-router-dom";
import { MobileFrame } from "@/components/MobileFrame";
import { ProgramAgreement } from "@/components/ProgramAgreement";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const Agreement: React.FC = () => {
  const navigate = useNavigate();

  const handleAgree = () => {
    navigate("/family/connect-choice");
  };

  return (
    <MobileFrame>
      <div className="flex flex-col h-full">
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="mr-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">NestiFi program agreement</h1>
        </div>
        
        <div className="flex-1">
          <ProgramAgreement 
            onAgree={handleAgree}
          />
        </div>
      </div>
    </MobileFrame>
  );
};

export default Agreement;
