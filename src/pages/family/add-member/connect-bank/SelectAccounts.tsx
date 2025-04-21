
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface BankAccount {
  id: string;
  name: string;
  type: string;
  balance: string;
  selected: boolean;
}

const SelectAccounts = () => {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState<BankAccount[]>([
    { id: "1", name: "Checking Account", type: "Checking", balance: "$2,540.33", selected: false },
    { id: "2", name: "Savings Account", type: "Savings", balance: "$15,200.00", selected: false },
    { id: "3", name: "Investment Account", type: "Investment", balance: "$8,750.45", selected: false },
  ]);
  
  const toggleAccountSelection = (id: string) => {
    setAccounts(accounts.map(account => 
      account.id === id ? { ...account, selected: !account.selected } : account
    ));
  };
  
  const isAnyAccountSelected = accounts.some(account => account.selected);
  
  const handleContinue = () => {
    // Store selected accounts in session storage
    const selectedAccounts = accounts.filter(account => account.selected);
    sessionStorage.setItem("selectedAccounts", JSON.stringify(selectedAccounts));
    navigate("/family/add-member/connection-success");
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-md mx-auto pt-8">
        <h1 className="text-2xl font-bold mb-6">Select Accounts</h1>
        <p className="text-gray-600 mb-6">
          Choose which accounts you want to connect to NestiFi
        </p>

        <div className="space-y-4 mb-8">
          {accounts.map((account) => (
            <Card 
              key={account.id} 
              className={`overflow-hidden ${account.selected ? 'border-[#13ab6c]' : ''}`}
            >
              <CardContent className="p-4">
                <div className="flex items-center">
                  <Checkbox 
                    id={`account-${account.id}`}
                    checked={account.selected}
                    onCheckedChange={() => toggleAccountSelection(account.id)}
                    className="mr-4"
                  />
                  <div className="flex-1">
                    <Label 
                      htmlFor={`account-${account.id}`}
                      className="font-medium cursor-pointer"
                    >
                      {account.name}
                    </Label>
                    <p className="text-sm text-gray-500">{account.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{account.balance}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Button 
          className="w-full py-6 bg-[#13ab6c]" 
          disabled={!isAnyAccountSelected}
          onClick={handleContinue}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default SelectAccounts;
