
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MobileFrame } from "@/components/MobileFrame";
import { AddChildIntro } from "@/components/AddChildIntro";
import { StopOnboardingModal } from "@/components/StopOnboardingModal";
import { ArrowLeft, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const AddChild: React.FC = () => {
  const navigate = useNavigate();
  const [showStopModal, setShowStopModal] = useState(false);

  const handleAddChild = () => {
    navigate("/family/child-details-add");
  };

  const handleContinue = () => {
    navigate("/family/investment-options");
  };

  const handleStopOnboarding = () => {
    // In a real app, you might want to save the current progress
    navigate("/home");
  };

  return (
    <MobileFrame>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowStopModal(true)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="flex-1">
          <AddChildIntro
            onAddChild={handleAddChild}
            onContinue={handleContinue}
          />
        </div>
        
        <StopOnboardingModal
          isOpen={showStopModal}
          onClose={() => setShowStopModal(false)}
          onStop={handleStopOnboarding}
          onContinue={() => setShowStopModal(false)}
        />
      </div>
    </MobileFrame>
  );
};

export default AddChild;
