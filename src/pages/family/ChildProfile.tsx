
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MobileFrame } from "@/components/MobileFrame";
import { ChildProfileSummary } from "@/components/ChildProfileSummary";
import { FutureGoalsSelector } from "@/components/FutureGoalsSelector";
import { FamilyCircleManager } from "@/components/FamilyCircleManager";
import { InvestmentDetailsForm } from "@/components/InvestmentDetailsForm";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data for the child
const mockChild = {
  id: "1",
  name: "Dan Williams",
  profileImage: null,
  futureGoals: ["College", "Travel"],
  familyCircle: [
    { id: "101", name: "Harry Soures", relation: "Grandfather" }
  ],
  investmentDetails: {
    amount: "200",
    frequency: "6th day of every month"
  }
};

const ChildProfile: React.FC = () => {
  const navigate = useNavigate();
  const { childId } = useParams<{ childId: string }>();
  const [childData, setChildData] = useState(mockChild);
  const [activeSection, setActiveSection] = useState<"summary" | "goals" | "family" | "investment">("summary");

  const handleEditSection = (section: "goals" | "family" | "investment") => {
    setActiveSection(section);
  };

  const handleSaveGoals = (goals: string[]) => {
    setChildData({
      ...childData,
      futureGoals: goals
    });
    setActiveSection("summary");
  };

  const handleSaveFamily = (members: any[]) => {
    setChildData({
      ...childData,
      familyCircle: members
    });
    setActiveSection("summary");
  };

  const handleSaveInvestment = (data: any) => {
    setChildData({
      ...childData,
      investmentDetails: {
        amount: data.amount.toString(),
        frequency: data.frequency === "monthly" ? "6th day of every month" : "every week"
      }
    });
    setActiveSection("summary");
  };

  const handleSave = () => {
    navigate("/family/investment-options");
  };

  return (
    <MobileFrame>
      <div className="flex flex-col h-full">
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              if (activeSection !== "summary") {
                setActiveSection("summary");
              } else {
                navigate("/family/investment-options");
              }
            }}
            className="mr-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">
            {activeSection === "summary" && "Dan's profile"}
            {activeSection === "goals" && "Future goals"}
            {activeSection === "family" && "Family circle"}
            {activeSection === "investment" && "Investment details"}
          </h1>
        </div>
        
        <div className="flex-1">
          {activeSection === "summary" && (
            <ChildProfileSummary
              childData={childData}
              onEditSection={handleEditSection}
              onSave={handleSave}
            />
          )}
          
          {activeSection === "goals" && (
            <FutureGoalsSelector
              selectedGoals={childData.futureGoals}
              onSave={handleSaveGoals}
              onCancel={() => setActiveSection("summary")}
            />
          )}
          
          {activeSection === "family" && (
            <FamilyCircleManager
              members={childData.familyCircle}
              onSave={handleSaveFamily}
              onCancel={() => setActiveSection("summary")}
            />
          )}
          
          {activeSection === "investment" && (
            <InvestmentDetailsForm
              initialData={{
                payMethod: "bank",
                product: "Fidelity Bitcoin ETF",
                amount: parseInt(childData.investmentDetails?.amount || "200"),
                frequency: childData.investmentDetails?.frequency.includes("month") ? "monthly" : "weekly"
              }}
              onSave={handleSaveInvestment}
              onCancel={() => setActiveSection("summary")}
            />
          )}
        </div>
      </div>
    </MobileFrame>
  );
};

export default ChildProfile;
