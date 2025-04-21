
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ProgramAgreementProps {
  onAgree: () => void;
}

export const ProgramAgreement: React.FC<ProgramAgreementProps> = ({ onAgree }) => {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">NestiFi Program agreement</h2>
        <p className="text-gray-600 text-sm">
          The NestiFi Program Agreement (Agreement) covers our relationship with you, in relation to setting out the terms to which we provide defined services to you.
        </p>
      </div>

      <ScrollArea className="h-64 border rounded-md p-4 bg-gray-50">
        <div className="space-y-4 text-sm">
          <p>
            YOU ACKNOWLEDGE THAT THIS AGREEMENT IS SUBJECT TO CHANGE AND THAT THE AMENDED AGREEMENTS WILL BE DELIVERED ELECTRONICALLY ON THE NESTIFI WEBSITE AND THE APPLICATION. YOU AGREE TO CHECK THE NESTIFI WEBSITE AND THE APPLICATION FOR NEW VERSIONS OF THESE AGREEMENTS. YOU AGREE THAT, BY CONTINUING TO MAINTAIN A NESTIFI BROKERAGE ACCOUNT OR USING ANY OF THE SERVICES PROVIDED IN CONNECTION WITH THE PROGRAM WITHOUT REJECTING ANY AMENDED TERMS WHEN THEY ARE POSTED ON THE APPLICATION OR THE WEBSITE, SUCH USE BINDS YOU TO ALL TERMS IN THE MOST UPDATED VERSION OF THIS AGREEMENT.
          </p>
          <p>
            I AGREE TO ADD ACCEPT ALL TERMS AND CONDITIONS.
          </p>
        </div>
      </ScrollArea>

      <div className="pt-4">
        <Button 
          onClick={onAgree} 
          className="w-full h-12 bg-green-500 hover:bg-green-600"
        >
          Agree and Continue
        </Button>
      </div>
    </div>
  );
};
