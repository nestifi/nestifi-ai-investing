
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const IncomeInfo = () => {
  const navigate = useNavigate();
  const [incomeSource, setIncomeSource] = useState("");
  const [position, setPosition] = useState("");
  const [annualIncome, setAnnualIncome] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const isFormValid = () => {
    return incomeSource.trim() !== "" && 
           position.trim() !== "" && 
           annualIncome.trim() !== "" &&
           agreeToTerms;
  };

  const handleContinue = () => {
    if (!isFormValid()) return;
    
    // Store income info in sessionStorage
    sessionStorage.setItem("incomeInfo", JSON.stringify({
      incomeSource,
      position,
      annualIncome
    }));
    
    navigate("/family/add-member/agreement");
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-md mx-auto pt-8">
        <h1 className="text-2xl font-bold mb-6">Income Information</h1>
        <p className="text-gray-600 mb-8">
          Please provide your income details to continue
        </p>

        <div className="space-y-6 mb-8">
          <div>
            <Label htmlFor="incomeSource">Source of Income</Label>
            <Select value={incomeSource} onValueChange={setIncomeSource}>
              <SelectTrigger>
                <SelectValue placeholder="Select source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="employment">Employment</SelectItem>
                <SelectItem value="self-employment">Self-Employment</SelectItem>
                <SelectItem value="investments">Investments</SelectItem>
                <SelectItem value="retirement">Retirement</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="position">Position</Label>
            <Select value={position} onValueChange={setPosition}>
              <SelectTrigger>
                <SelectValue placeholder="Select position" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="employee">Employee</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="director">Director</SelectItem>
                <SelectItem value="owner">Business Owner</SelectItem>
                <SelectItem value="contractor">Contractor</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="annualIncome">Annual Income</Label>
            <Select value={annualIncome} onValueChange={setAnnualIncome}>
              <SelectTrigger>
                <SelectValue placeholder="Select income range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-25000">$0 - $25,000</SelectItem>
                <SelectItem value="25001-50000">$25,001 - $50,000</SelectItem>
                <SelectItem value="50001-75000">$50,001 - $75,000</SelectItem>
                <SelectItem value="75001-100000">$75,001 - $100,000</SelectItem>
                <SelectItem value="100001-150000">$100,001 - $150,000</SelectItem>
                <SelectItem value="150001-200000">$150,001 - $200,000</SelectItem>
                <SelectItem value="200001+">$200,001+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox 
              id="terms" 
              checked={agreeToTerms}
              onCheckedChange={(checked) => setAgreeToTerms(checked === true)}
              className="mt-1"
            />
            <Label htmlFor="terms" className="text-sm">
              I agree that the information provided is accurate and NestiFi may use this information to verify my identity and process my application.
            </Label>
          </div>
        </div>

        <Button 
          className="w-full py-6 bg-[#13ab6c]" 
          disabled={!isFormValid()}
          onClick={handleContinue}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default IncomeInfo;
