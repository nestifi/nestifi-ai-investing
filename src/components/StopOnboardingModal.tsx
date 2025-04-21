
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface StopOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStop: () => void;
  onContinue: () => void;
}

export const StopOnboardingModal: React.FC<StopOnboardingModalProps> = ({
  isOpen,
  onClose,
  onStop,
  onContinue,
}) => {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Stop onboarding</SheetTitle>
          <SheetDescription>
            Are you sure you want to stop the onboarding process? Don't worry—you'll still be able to complete your details later at your convenience.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <Button
            variant="outline"
            onClick={onStop}
            className="w-full"
          >
            Stop onboarding
          </Button>
          <Button
            onClick={onContinue}
            className="w-full bg-green-500 hover:bg-green-600"
          >
            I want to continue
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
