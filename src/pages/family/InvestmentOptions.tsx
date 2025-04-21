
import React from "react";
import { useNavigate } from "react-router-dom";
import { MobileFrame } from "@/components/MobileFrame";
import { InvestmentOptionsList } from "@/components/InvestmentOptionsList";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const InvestmentOptions: React.FC = () => {
  const navigate = useNavigate();

  const children = [
    {
      id: "1",
      name: "Dan Williams",
      dob: "18/02/2017",
      profileImage: null,
      hasInvestmentOptions: false,
    },
    {
      id: "2",
      name: "Sandy Mendes",
      dob: "12/12/2016",
      profileImage: null,
      hasInvestmentOptions: false,
    },
    {
      id: "3",
      name: "Kate Perkins",
      dob: "26/08/2019",
      profileImage: null,
      hasInvestmentOptions: false,
    }
  ];

  const handleSelectChild = (childId: string) => {
    navigate(`/family/child-profile/${childId}`);
  };

  const handleContinue = () => {
    navigate("/home");
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
          <h1 className="text-xl font-semibold">Add investment options</h1>
        </div>
        
        <div className="flex-1">
          <InvestmentOptionsList
            children={children}
            onSelectChild={handleSelectChild}
            onContinue={handleContinue}
          />
        </div>
      </div>
    </MobileFrame>
  );
};

export default InvestmentOptions;
