
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Minus, Plus } from "lucide-react";

interface InvestmentDetailsFormProps {
  initialData?: {
    payMethod: "bank" | "crypto";
    product: string;
    amount: number;
    frequency: "weekly" | "monthly";
  };
  onSave: (data: any) => void;
  onCancel: () => void;
}

export const InvestmentDetailsForm: React.FC<InvestmentDetailsFormProps> = ({
  initialData,
  onSave,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    payMethod: initialData?.payMethod || "bank",
    product: initialData?.product || "Fidelity Bitcoin ETF",
    amount: initialData?.amount || 200,
    frequency: initialData?.frequency || "monthly",
  });

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const decreaseAmount = () => {
    if (formData.amount > 50) {
      setFormData((prev) => ({ ...prev, amount: prev.amount - 50 }));
    }
  };

  const increaseAmount = () => {
    setFormData((prev) => ({ ...prev, amount: prev.amount + 50 }));
  };

  const handleSubmit = () => {
    setShowConfirmation(true);
  };

  const confirmInvestment = () => {
    onSave(formData);
  };

  const products = [
    "Fidelity Bitcoin ETF",
    "S&P 500 Index Fund",
    "UTMA Fund",
    "UGMA Fund",
    "iShares Core S&P 500 ETF",
    "Vanguard Total Stock Market ETF",
    "Bitcoin ETF from Blackrock"
  ];

  return (
    <div className="space-y-6 relative">
      {showConfirmation && (
        <div className="absolute inset-0 bg-white bg-opacity-95 z-10 flex flex-col items-center justify-center p-6">
          <h3 className="text-xl font-semibold mb-6">Confirmation</h3>
          <p className="text-center mb-6">
            You are investing ${formData.amount} per month into<br />
            {formData.product} on behalf of Dan Williams
          </p>
          <div className="flex space-x-3 w-full">
            <Button
              variant="outline"
              onClick={() => setShowConfirmation(false)}
              className="flex-1"
            >
              Back
            </Button>
            <Button
              onClick={confirmInvestment}
              className="flex-1 bg-green-500 hover:bg-green-600"
            >
              Confirm
            </Button>
          </div>
        </div>
      )}

      <div>
        <h2 className="text-xl font-semibold mb-2">Investment details</h2>
        <p className="text-gray-600 text-sm">
          Enter the amount you want to invest and the investment dates.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Pay with</Label>
          <RadioGroup
            value={formData.payMethod}
            onValueChange={(value) => handleRadioChange("payMethod", value)}
            className="flex flex-col space-y-2 mt-2"
          >
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="bank" id="bank" />
              <Label htmlFor="bank" className="cursor-pointer">JPMorgan Chase Bank</Label>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="crypto" id="crypto" />
              <Label htmlFor="crypto" className="cursor-pointer">Coinbase Wallet</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label htmlFor="product">Investment product</Label>
          <select
            id="product"
            name="product"
            value={formData.product}
            onChange={handleInputChange}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm mt-2"
          >
            {products.map((product) => (
              <option key={product} value={product}>
                {product}
              </option>
            ))}
          </select>
        </div>

        <div>
          <Label>Amount</Label>
          <div className="flex items-center mt-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={decreaseAmount}
              className="rounded-r-none"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <div className="flex-1 flex items-center justify-center border-t border-b h-10">
              <span className="font-medium">${formData.amount} USDC</span>
            </div>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={increaseAmount}
              className="rounded-l-none"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Current average: ${(formData.amount * 0.98).toFixed(2)} in USDC
          </p>
        </div>

        <div>
          <Label>Frequency</Label>
          <div className="grid grid-cols-2 gap-3 mt-2">
            <Button
              type="button"
              variant={formData.frequency === "weekly" ? "default" : "outline"}
              className={formData.frequency === "weekly" ? "bg-green-500 hover:bg-green-600" : ""}
              onClick={() => handleRadioChange("frequency", "weekly")}
            >
              Weekly
            </Button>
            <Button
              type="button"
              variant={formData.frequency === "monthly" ? "default" : "outline"}
              className={formData.frequency === "monthly" ? "bg-green-500 hover:bg-green-600" : ""}
              onClick={() => handleRadioChange("frequency", "monthly")}
            >
              Monthly
            </Button>
          </div>
        </div>
      </div>

      <div className="flex space-x-3 pt-4">
        <Button 
          variant="outline" 
          onClick={onCancel} 
          className="flex-1 h-12"
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          className="flex-1 h-12 bg-green-500 hover:bg-green-600"
        >
          Save
        </Button>
      </div>
    </div>
  );
};
