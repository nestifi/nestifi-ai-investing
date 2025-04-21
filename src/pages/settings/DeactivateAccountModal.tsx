
import React from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const DeactivateAccountModal: React.FC<{
  open: boolean;
  onOpenChange: (v: boolean) => void;
}> = ({ open, onOpenChange }) => {
  const navigate = useNavigate();
  function handleDeactivate() {
    // Simulate API call. Log user out.
    onOpenChange(false);
    setTimeout(() => {
      navigate("/auth/login");
    }, 300);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="pb-6">
        <DialogTitle>Deactivate account</DialogTitle>
        <DialogDescription>
          Are you sure you want to deactivate your account? This action is permanent and cannot be reversed.
        </DialogDescription>
        <DialogFooter className="flex justify-between gap-3 mt-6">
          <DialogClose asChild>
            <Button variant="outline" className="flex-1 border-green-700 text-green-700">Cancel</Button>
          </DialogClose>
          <Button className="flex-1 bg-red-600 hover:bg-red-700" onClick={handleDeactivate}>
            Deactivate
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default DeactivateAccountModal;
