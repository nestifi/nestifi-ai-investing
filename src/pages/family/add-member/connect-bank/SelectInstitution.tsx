
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";

interface Bank {
  id: string;
  name: string;
  logo?: string;
}

const SelectInstitution = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  
  const banks: Bank[] = [
    { id: "1", name: "Chase", logo: "/placeholder.svg" },
    { id: "2", name: "Bank of America", logo: "/placeholder.svg" },
    { id: "3", name: "Wells Fargo", logo: "/placeholder.svg" },
    { id: "4", name: "Citibank", logo: "/placeholder.svg" },
    { id: "5", name: "Capital One", logo: "/placeholder.svg" },
  ];

  const filteredBanks = banks.filter(bank => 
    bank.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectBank = (bankId: string) => {
    // Store selected bank in session storage
    sessionStorage.setItem("selectedBankId", bankId);
    navigate("/family/add-member/connect-bank/login");
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-md mx-auto pt-8">
        <h1 className="text-2xl font-bold mb-6">Select Your Bank</h1>
        <p className="text-gray-600 mb-6">
          Find and select your financial institution
        </p>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search for your bank"
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="space-y-3 mb-6">
          {filteredBanks.map((bank) => (
            <Card 
              key={bank.id} 
              className="cursor-pointer hover:border-[#13ab6c]"
              onClick={() => handleSelectBank(bank.id)}
            >
              <CardContent className="p-4 flex items-center">
                <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center mr-4 overflow-hidden">
                  {bank.logo && (
                    <img 
                      src={bank.logo} 
                      alt={bank.name} 
                      className="h-8 w-8 object-contain"
                    />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{bank.name}</h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectInstitution;
