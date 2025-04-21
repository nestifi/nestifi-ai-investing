
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users, AlertCircle, X } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";

const FamilyCircleIntro = () => {
  const navigate = useNavigate();
  const [showStopModal, setShowStopModal] = useState(false);
  
  const handleAddChild = () => {
    navigate("/family/add-member/add-child-details");
  };
  
  const handleContinue = () => {
    navigate("/family/add-member/investment-options");
  };
  
  const handleStopOnboarding = () => {
    // Handle stopping the onboarding process
    navigate("/family/family-circle");
  };
  
  const handleContinueOnboarding = () => {
    setShowStopModal(false);
    navigate("/family/add-member/add-child-details");
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-md mx-auto pt-8">
        <h1 className="text-2xl font-bold mb-6">Family Circle</h1>
        <p className="text-gray-600 mb-8">
          Now, let's create your family circle by adding children to your account
        </p>

        <div className="flex justify-center mb-8">
          <div className="w-64 h-64 bg-[#13ab6c]/10 rounded-full flex items-center justify-center">
            <Users className="h-24 w-24 text-[#13ab6c]" />
          </div>
        </div>

        <div className="space-y-4">
          <Button 
            className="w-full py-6 bg-[#13ab6c]"
            onClick={handleAddChild}
          >
            Add child
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full py-6 border-[#13ab6c] text-[#13ab6c]"
            onClick={() => setShowStopModal(true)}
          >
            Continue
          </Button>
        </div>
      </div>
      
      {/* Stop Onboarding Modal */}
      <Sheet open={showStopModal} onOpenChange={setShowStopModal}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-center">
              <div className="flex justify-center mb-4">
                <AlertCircle className="h-12 w-12 text-amber-500" />
              </div>
              Stop onboarding process?
            </SheetTitle>
            <SheetDescription className="text-center">
              Are you sure you want to continue without adding children to your family circle?
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-col space-y-4 mt-8">
            <Button 
              className="w-full py-6"
              variant="destructive"
              onClick={handleStopOnboarding}
            >
              Stop
            </Button>
            <Button 
              className="w-full py-6 bg-[#13ab6c]"
              onClick={handleContinueOnboarding}
            >
              Continue & Add
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default FamilyCircleIntro;
