
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Users, User } from "lucide-react";

const ChooseAccountType = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<"adult" | "child" | null>(null);

  const handleContinue = () => {
    if (selectedType === "adult") {
      navigate("/family/add-member/adult-details");
    } else if (selectedType === "child") {
      navigate("/family/add-member/child-details");
    }
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-md mx-auto pt-8">
        <h1 className="text-2xl font-bold mb-6">Choose Account Type</h1>
        <p className="text-gray-600 mb-8">
          Select the type of account you want to add to your family
        </p>

        <div className="space-y-4 mb-8">
          <Card 
            className={`cursor-pointer overflow-hidden border-2 ${
              selectedType === "adult" ? "border-[#13ab6c]" : "border-gray-200"
            }`}
            onClick={() => setSelectedType("adult")}
          >
            <CardContent className="p-4 flex items-center">
              <div className="h-10 w-10 bg-[#13ab6c]/10 rounded-full flex items-center justify-center mr-4">
                <Users className="h-5 w-5 text-[#13ab6c]" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Adult account</h3>
                <p className="text-sm text-gray-500">For parents or guardians</p>
              </div>
              {selectedType === "adult" && (
                <Check className="h-5 w-5 text-[#13ab6c]" />
              )}
            </CardContent>
          </Card>

          <Card 
            className={`cursor-pointer overflow-hidden border-2 ${
              selectedType === "child" ? "border-[#13ab6c]" : "border-gray-200"
            }`}
            onClick={() => setSelectedType("child")}
          >
            <CardContent className="p-4 flex items-center">
              <div className="h-10 w-10 bg-[#13ab6c]/10 rounded-full flex items-center justify-center mr-4">
                <User className="h-5 w-5 text-[#13ab6c]" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Child account</h3>
                <p className="text-sm text-gray-500">For children under 18</p>
              </div>
              {selectedType === "child" && (
                <Check className="h-5 w-5 text-[#13ab6c]" />
              )}
            </CardContent>
          </Card>
        </div>

        <Button 
          className="w-full py-6 bg-[#13ab6c]" 
          disabled={!selectedType}
          onClick={handleContinue}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default ChooseAccountType;
