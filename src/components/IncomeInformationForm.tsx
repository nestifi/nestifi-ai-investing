
import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface IncomeInformationFormProps {
  onSubmit: (data: any) => void;
}

export const IncomeInformationForm: React.FC<IncomeInformationFormProps> = ({
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    employmentStatus: "",
    incomeRange: "",
    taxBracket: "",
    termsAccepted: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, termsAccepted: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Income information</h2>
        <p className="text-gray-600 text-sm mb-6">
          Share your financial details to get personalized recommendations that fit your needs.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="employmentStatus">Employment status</Label>
        <select
          id="employmentStatus"
          name="employmentStatus"
          value={formData.employmentStatus}
          onChange={handleInputChange}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          required
        >
          <option value="">Choose option</option>
          <option value="employed">Employed</option>
          <option value="self-employed">Self-employed</option>
          <option value="unemployed">Unemployed</option>
          <option value="retired">Retired</option>
          <option value="student">Student</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="incomeRange">Annual income</Label>
        <select
          id="incomeRange"
          name="incomeRange"
          value={formData.incomeRange}
          onChange={handleInputChange}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          required
        >
          <option value="">Select range</option>
          <option value="0-25000">$0 - $25,000</option>
          <option value="25000-50000">$25,000 - $50,000</option>
          <option value="50000-75000">$50,000 - $75,000</option>
          <option value="75000-100000">$75,000 - $100,000</option>
          <option value="100000-200000">$100,000 - $200,000</option>
          <option value="200000+">$200,000+</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="taxBracket">Federal tax bracket</Label>
        <select
          id="taxBracket"
          name="taxBracket"
          value={formData.taxBracket}
          onChange={handleInputChange}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          required
        >
          <option value="">Select bracket</option>
          <option value="10">10%</option>
          <option value="12">12%</option>
          <option value="22">22%</option>
          <option value="24">24%</option>
          <option value="32">32%</option>
          <option value="35">35%</option>
          <option value="37">37%</option>
        </select>
      </div>

      <div className="flex items-center space-x-2 pt-4">
        <Checkbox 
          id="terms" 
          checked={formData.termsAccepted}
          onCheckedChange={handleCheckboxChange}
          required
        />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          I confirm that I have read, understood, and agree to NestiFi&apos;s Terms and Conditions
        </label>
      </div>

      <div className="pt-4">
        <Button 
          type="submit" 
          className="w-full h-12 bg-green-500 hover:bg-green-600"
          disabled={!formData.termsAccepted}
        >
          Continue
        </Button>
      </div>
    </form>
  );
};
