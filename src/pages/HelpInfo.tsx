
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

const HelpInfo = () => {
  const navigate = useNavigate();
  
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
          <h1 className="text-2xl font-bold">What is Freeze?</h1>
        </div>
        
        <Card className="mb-6">
          <CardContent className="p-6">
            <p className="mb-4">
              The Freeze feature allows you to temporarily disable your NestiFi account or specific connected cards for security purposes.
            </p>
            
            <h2 className="text-lg font-medium mb-2">When to use Freeze</h2>
            <ul className="list-disc pl-5 mb-4 space-y-2">
              <li>If you've lost your physical card linked to NestiFi</li>
              <li>If you notice suspicious activity on your account</li>
              <li>If you want to prevent new transactions while reviewing your account</li>
              <li>To help children learn about controlling spending</li>
            </ul>
            
            <h2 className="text-lg font-medium mb-2">How it works</h2>
            <p className="mb-4">
              When you freeze your account or card:
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-2">
              <li>All new purchase transactions will be declined</li>
              <li>Recurring payments and subscriptions may still go through</li>
              <li>Account transfers and deposits can still be processed</li>
              <li>You can unfreeze at any time with immediate effect</li>
            </ul>
            
            <p className="text-sm text-gray-500 italic">
              Note: Freezing is not a replacement for reporting a card as lost or stolen. If your card is permanently lost, please contact customer support to request a replacement.
            </p>
          </CardContent>
        </Card>
        
        <div className="text-center">
          <Button 
            variant="link" 
            className="text-[#13ab6c]"
            onClick={() => navigate("/help")}
          >
            View all help topics
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HelpInfo;
