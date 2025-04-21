
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MobileFrame } from "@/components/MobileFrame";

const Onboarding3: React.FC = () => {
  const navigate = useNavigate();

  return (
    <MobileFrame>
      <div className="flex flex-col h-full justify-between text-center">
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="w-56 h-56 rounded-full bg-green-100 mb-8 flex items-center justify-center">
            <div className="w-40 h-40 rounded-full bg-green-200 flex items-center justify-center relative">
              <img 
                src="/lovable-uploads/19bc6416-3f7e-4d7a-88f8-11dd6f753a32.png" 
                alt="Share expenses illustration" 
                className="w-36 h-36 object-contain"
              />
              <div className="absolute right-0 bottom-0 w-16 h-16 rounded-full bg-green-100 border-4 border-white flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-xs font-bold">$</span>
                </div>
              </div>
              <div className="absolute -left-8 top-4 w-14 h-14 rounded-full bg-green-100 border-4 border-white flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-xs font-bold">$</span>
                </div>
              </div>
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Share Expenses With Ease
          </h1>
          <p className="text-gray-600 max-w-xs mb-6">
            Split bills, track shared expenses, and manage financial responsibilities without hassle.
          </p>
        </div>
        
        <div className="px-4 mb-6">
          <Button 
            className="w-full h-12 bg-green-500 hover:bg-green-600"
            onClick={() => navigate("/signup-options")}
          >
            Get Started
          </Button>
        </div>
      </div>
    </MobileFrame>
  );
};

export default Onboarding3;
