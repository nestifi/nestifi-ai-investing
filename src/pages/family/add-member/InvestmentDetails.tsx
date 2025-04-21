
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, AlertCircle } from "lucide-react";
import { toast } from "@/components/ui/sonner";

const InvestmentDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  const [paymentMethod, setPaymentMethod] = useState("");
  const [investmentGoal, setInvestmentGoal] = useState("");
  const [investmentProduct, setInvestmentProduct] = useState("");
  const [amount, setAmount] = useState("");
  const [frequency, setFrequency] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  const isFormValid = () => {
    return paymentMethod && investmentGoal && investmentProduct && amount && frequency;
  };
  
  const handleInvest = () => {
    if (!isFormValid()) return;
    setShowConfirmation(true);
  };
  
  const handleConfirm = () => {
    // In a real app, this would save the investment details to storage or API
    setShowConfirmation(false);
    toast.success("Investment setup successfully");
    navigate(`/family/add-member/child-profile/${id}`);
  };
  
  const handleCancel = () => {
    navigate(`/family/add-member/child-profile/${id}`);
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-md mx-auto pt-8">
        <h1 className="text-2xl font-bold mb-6">Investment Details</h1>
        <p className="text-gray-600 mb-8">
          Set up recurring investments for this child's financial goals
        </p>

        <div className="space-y-6 mb-8">
          <div>
            <Label htmlFor="paymentMethod">Pay with</Label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger id="paymentMethod">
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bank">Bank Account</SelectItem>
                <SelectItem value="card">Credit/Debit Card</SelectItem>
                <SelectItem value="crypto">Crypto Wallet</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="investmentGoal">Investment goal</Label>
            <Select value={investmentGoal} onValueChange={setInvestmentGoal}>
              <SelectTrigger id="investmentGoal">
                <SelectValue placeholder="Select goal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="college">College</SelectItem>
                <SelectItem value="car">First Car</SelectItem>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="general">General Savings</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="investmentProduct">Investment product</Label>
            <Select value={investmentProduct} onValueChange={setInvestmentProduct}>
              <SelectTrigger id="investmentProduct">
                <SelectValue placeholder="Select product" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="etf_fidelity">Fidelity Total Market ETF</SelectItem>
                <SelectItem value="etf_vanguard">Vanguard Growth ETF</SelectItem>
                <SelectItem value="529_plan">529 College Savings Plan</SelectItem>
                <SelectItem value="high_yield">High Yield Savings</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="$0.00"
            />
          </div>
          
          <div>
            <Label htmlFor="frequency">Frequency</Label>
            <Select value={frequency} onValueChange={setFrequency}>
              <SelectTrigger id="frequency">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="biweekly">Bi-weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-3">
          <Button 
            className="w-full py-6 bg-[#13ab6c]"
            disabled={!isFormValid()}
            onClick={handleInvest}
          >
            Invest
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full py-6" 
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </div>
      </div>
      
      {/* Confirmation Sheet */}
      <Sheet open={showConfirmation} onOpenChange={setShowConfirmation}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-center">
              <div className="flex justify-center mb-4">
                <div className="h-16 w-16 rounded-full bg-[#13ab6c]/10 flex items-center justify-center">
                  <Check className="h-8 w-8 text-[#13ab6c]" />
                </div>
              </div>
              Confirm Investment
            </SheetTitle>
          </SheetHeader>
          
          <div className="mt-6">
            <Card className="mb-6">
              <CardContent className="p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500">Goal:</span>
                  <span>{getGoalName(investmentGoal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Product:</span>
                  <span>{getProductName(investmentProduct)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Amount:</span>
                  <span>${amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Frequency:</span>
                  <span>{getFrequencyName(frequency)}</span>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex items-start p-4 bg-amber-50 rounded-md mb-6">
              <AlertCircle className="h-5 w-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-700">
                By confirming, you agree to set up automatic recurring investments that will be processed on your selected frequency.
              </p>
            </div>
            
            <div className="space-y-3">
              <Button 
                className="w-full bg-[#13ab6c]"
                onClick={handleConfirm}
              >
                Confirm
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => setShowConfirmation(false)}
              >
                Back
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

// Helper functions to get display names
function getGoalName(goal: string): string {
  const goals: Record<string, string> = {
    "college": "College",
    "car": "First Car",
    "house": "House",
    "general": "General Savings"
  };
  return goals[goal] || goal;
}

function getProductName(product: string): string {
  const products: Record<string, string> = {
    "etf_fidelity": "Fidelity Total Market ETF",
    "etf_vanguard": "Vanguard Growth ETF",
    "529_plan": "529 College Savings Plan",
    "high_yield": "High Yield Savings"
  };
  return products[product] || product;
}

function getFrequencyName(freq: string): string {
  const frequencies: Record<string, string> = {
    "weekly": "Weekly",
    "biweekly": "Bi-weekly",
    "monthly": "Monthly",
    "quarterly": "Quarterly"
  };
  return frequencies[freq] || freq;
}

export default InvestmentDetails;
