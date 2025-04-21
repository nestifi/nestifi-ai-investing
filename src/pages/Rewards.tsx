
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// Sample rewards data
const rewardsData = {
  all: [
    { id: 1, brand: "Starbucks", description: "15% cashback on all purchases", image: "/placeholder.svg", category: "food" },
    { id: 2, brand: "Amazon", description: "5% cashback on all purchases", image: "/placeholder.svg", category: "shopping" },
    { id: 3, brand: "Uber", description: "$5 off your next ride", image: "/placeholder.svg", category: "travel" },
    { id: 4, brand: "Walmart", description: "10% off your next purchase", image: "/placeholder.svg", category: "shopping" },
    { id: 5, brand: "McDonald's", description: "Free medium fries with purchase", image: "/placeholder.svg", category: "food" },
    { id: 6, brand: "Delta", description: "2x miles on your next flight", image: "/placeholder.svg", category: "travel" },
  ],
  get food() { return this.all.filter(reward => reward.category === "food") },
  get shopping() { return this.all.filter(reward => reward.category === "shopping") },
  get travel() { return this.all.filter(reward => reward.category === "travel") }
};

const Rewards = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  
  const handleClaimReward = (id: number) => {
    console.log(`Claiming reward with id: ${id}`);
    // In a real app, this would trigger an API call
  };
  
  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-md mx-auto pt-6">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="icon" 
            className="mr-2"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Rewards</h1>
        </div>
        
        <div className="mb-6">
          <Tabs defaultValue="all" onValueChange={setActiveTab}>
            <TabsList className="w-full grid grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="food">Food</TabsTrigger>
              <TabsTrigger value="shopping">Shopping</TabsTrigger>
              <TabsTrigger value="travel">Travel</TabsTrigger>
            </TabsList>
            
            {(["all", "food", "shopping", "travel"] as const).map((tab) => (
              <TabsContent key={tab} value={tab} className="mt-4">
                <div className="space-y-4">
                  {rewardsData[tab].map((reward) => (
                    <Card key={reward.id}>
                      <CardContent className="p-4">
                        <div className="flex">
                          <div className="h-16 w-16 rounded-md bg-gray-100 mr-4 overflow-hidden flex-shrink-0">
                            <img 
                              src={reward.image} 
                              alt={reward.brand} 
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-1">
                              <div className="flex items-center">
                                <Avatar className="h-6 w-6 mr-2">
                                  <AvatarImage src={reward.image} alt={reward.brand} />
                                  <AvatarFallback>{reward.brand[0]}</AvatarFallback>
                                </Avatar>
                                <h3 className="font-medium">{reward.brand}</h3>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{reward.description}</p>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-[#13ab6c] border-[#13ab6c] hover:bg-[#13ab6c]/10"
                              onClick={() => handleClaimReward(reward.id)}
                            >
                              Claim
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Rewards;
