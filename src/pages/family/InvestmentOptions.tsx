
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, DollarSign } from "lucide-react";

interface InvestmentOption {
  id: string;
  childName: string;
  age: number;
  status: "Not started" | "In progress" | "Complete";
  imageUrl?: string;
}

const InvestmentOptions = () => {
  const navigate = useNavigate();
  const [options, setOptions] = useState<InvestmentOption[]>([
    { 
      id: "1", 
      childName: "Michael Parker", 
      age: 12, 
      status: "In progress", 
      imageUrl: "/placeholder.svg" 
    },
    { 
      id: "2", 
      childName: "Sarah Parker", 
      age: 8, 
      status: "Not started", 
      imageUrl: "/placeholder.svg" 
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Investment Options</h1>
          <Button variant="outline" size="icon" onClick={() => navigate("/")}>
            <DollarSign className="h-5 w-5" />
          </Button>
        </div>

        <p className="text-gray-600 mb-6">
          Choose investment options for each child in your family circle
        </p>

        <div className="space-y-4 mb-8">
          {options.map((option) => (
            <Card key={option.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-full bg-gray-200 mr-4 overflow-hidden">
                      {option.imageUrl && (
                        <img 
                          src={option.imageUrl} 
                          alt={option.childName} 
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium">{option.childName}</h3>
                      <p className="text-sm text-gray-500">Age: {option.age}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className={`text-sm mr-2 ${
                      option.status === "Complete" ? "text-green-500" : 
                      option.status === "In progress" ? "text-amber-500" : 
                      "text-gray-400"
                    }`}>
                      {option.status}
                    </span>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Button 
          className="w-full"
          onClick={() => navigate("/")}
        >
          Complete setup
        </Button>
      </div>
    </div>
  );
};

export default InvestmentOptions;
