
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User, Plus, ArrowDown, ArrowUp, Home as HomeIcon, Gift, Star, BarChart } from "lucide-react";

// Sample transaction data
const transactions = [
  { id: 1, date: "Apr 20, 2025", description: "Transfer to Sandy", amount: -50, type: "outgoing" },
  { id: 2, date: "Apr 18, 2025", description: "Deposit from Bank", amount: 500, type: "incoming" },
  { id: 3, date: "Apr 15, 2025", description: "College Fund Investment", amount: -250, type: "outgoing" },
  { id: 4, date: "Apr 10, 2025", description: "Gift from Emily", amount: 75, type: "incoming" },
  { id: 5, date: "Apr 05, 2025", description: "Monthly Contribution", amount: -100, type: "outgoing" },
];

// Sample family members
const familyMembers = [
  { id: "1", name: "Sandy", age: 12, imageUrl: "/placeholder.svg" },
  { id: "2", name: "James", age: 8, imageUrl: "/placeholder.svg" },
];

const Home = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("nestifi");
  
  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };
  
  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-lg font-medium">Welcome Back,</h1>
            <h2 className="text-2xl font-bold">Robert!</h2>
          </div>
          <Avatar className="h-12 w-12">
            <AvatarImage src="/placeholder.svg" alt="Robert" />
            <AvatarFallback>RS</AvatarFallback>
          </Avatar>
        </div>
        
        <Tabs defaultValue="nestifi" onValueChange={setActiveTab} className="mb-6">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="nestifi">NestiFi</TabsTrigger>
            <TabsTrigger value="bank">Bank account</TabsTrigger>
          </TabsList>
          
          <TabsContent value="nestifi" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Available Balance</h3>
                <p className="text-3xl font-bold mb-4">{formatMoney(30000)}</p>
                
                <div className="flex space-x-3">
                  <Button 
                    className="flex-1 bg-[#13ab6c]"
                    onClick={() => navigate("/family/gift-deposit")}
                  >
                    <ArrowDown className="mr-2 h-4 w-4" /> Deposit
                  </Button>
                  <Button 
                    className="flex-1 bg-[#13ab6c]"
                    onClick={() => navigate("/transfer")}
                  >
                    <ArrowUp className="mr-2 h-4 w-4" /> Transfer
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="bank" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Bank Balance</h3>
                <p className="text-3xl font-bold mb-4">{formatMoney(25000)}</p>
                
                <div className="flex space-x-3">
                  <Button 
                    className="flex-1"
                    onClick={() => navigate("/connect-bank")}
                  >
                    Manage
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">Family Circle</h3>
          <div className="flex items-center space-x-3 overflow-x-auto pb-2 no-scrollbar">
            {familyMembers.map((member) => (
              <div 
                key={member.id} 
                className="flex flex-col items-center cursor-pointer flex-shrink-0"
                onClick={() => navigate(`/family/add-member/child-profile/${member.id}`)}
              >
                <Avatar className="h-16 w-16 mb-2">
                  <AvatarImage src={member.imageUrl} alt={member.name} />
                  <AvatarFallback>{member.name[0]}</AvatarFallback>
                </Avatar>
                <p className="text-sm font-medium">{member.name}</p>
              </div>
            ))}
            
            <div 
              className="flex flex-col items-center cursor-pointer flex-shrink-0"
              onClick={() => navigate("/family/add-member")}
            >
              <div className="h-16 w-16 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center mb-2">
                <Plus className="h-6 w-6 text-gray-400" />
              </div>
              <p className="text-sm font-medium text-gray-500">Add</p>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-medium">Recent Transactions</h3>
            <Button variant="link" className="text-sm text-[#13ab6c] p-0" onClick={() => navigate("/transactions")}>
              See all
            </Button>
          </div>
          
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between py-2 border-b border-gray-100">
                <div className="flex items-center">
                  <div className={`h-10 w-10 rounded-full ${transaction.type === 'incoming' ? 'bg-green-100' : 'bg-red-100'} flex items-center justify-center mr-3`}>
                    {transaction.type === 'incoming' ? (
                      <ArrowDown className={`h-5 w-5 ${transaction.type === 'incoming' ? 'text-green-600' : 'text-red-600'}`} />
                    ) : (
                      <ArrowUp className={`h-5 w-5 ${transaction.type === 'incoming' ? 'text-green-600' : 'text-red-600'}`} />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-sm text-gray-500">{transaction.date}</p>
                  </div>
                </div>
                <p className={transaction.type === 'incoming' ? 'text-green-600' : 'text-red-600'}>
                  {transaction.type === 'incoming' ? '+' : ''}{formatMoney(transaction.amount)}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2">
          <div className="max-w-md mx-auto flex justify-around">
            <Button variant="ghost" className="flex flex-col items-center" onClick={() => navigate("/")}>
              <HomeIcon className="h-5 w-5 text-[#13ab6c]" />
              <span className="text-xs mt-1">Home</span>
            </Button>
            <Button variant="ghost" className="flex flex-col items-center" onClick={() => navigate("/rewards")}>
              <Star className="h-5 w-5" />
              <span className="text-xs mt-1">Rewards</span>
            </Button>
            <Button variant="ghost" className="flex flex-col items-center" onClick={() => navigate("/qr-code")}>
              <Gift className="h-5 w-5" />
              <span className="text-xs mt-1">Gift</span>
            </Button>
            <Button variant="ghost" className="flex flex-col items-center" onClick={() => navigate("/statistics")}>
              <BarChart className="h-5 w-5" />
              <span className="text-xs mt-1">Stats</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
