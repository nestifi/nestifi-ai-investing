
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, CreditCard, Building, Wallet } from "lucide-react";
import { toast } from "@/components/ui/sonner";

const GiftDeposit = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDeposit = () => {
    if (!paymentMethod || !amount) {
      toast.error("Please fill out all required fields");
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success("Gift deposit successful!");
      navigate("/family/deposit-success");
    }, 1500);
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
          <h1 className="text-2xl font-bold">Gift Deposit</h1>
        </div>

        <div className="space-y-6 mb-8">
          <div>
            <Label htmlFor="paymentMethod">Pay with</Label>
            <div className="grid grid-cols-3 gap-3 mt-2">
              <Card 
                className={`cursor-pointer transition-all ${paymentMethod === "bank" ? "border-[#13ab6c]" : ""}`}
                onClick={() => setPaymentMethod("bank")}
              >
                <CardContent className="p-3 flex flex-col items-center justify-center">
                  <Building className="h-6 w-6 text-gray-700 mb-1" />
                  <span className="text-sm">Bank</span>
                </CardContent>
              </Card>
              <Card 
                className={`cursor-pointer transition-all ${paymentMethod === "card" ? "border-[#13ab6c]" : ""}`}
                onClick={() => setPaymentMethod("card")}
              >
                <CardContent className="p-3 flex flex-col items-center justify-center">
                  <CreditCard className="h-6 w-6 text-gray-700 mb-1" />
                  <span className="text-sm">Card</span>
                </CardContent>
              </Card>
              <Card 
                className={`cursor-pointer transition-all ${paymentMethod === "crypto" ? "border-[#13ab6c]" : ""}`}
                onClick={() => setPaymentMethod("crypto")}
              >
                <CardContent className="p-3 flex flex-col items-center justify-center">
                  <Wallet className="h-6 w-6 text-gray-700 mb-1" />
                  <span className="text-sm">Crypto</span>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div>
            <Label htmlFor="amount">Amount</Label>
            <div className="relative mt-2">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <Input
                id="amount"
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="pl-8"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="note" className="flex justify-between">
              <span>Note (optional)</span>
              <span className="text-gray-500 text-sm">{note.length}/100</span>
            </Label>
            <Textarea
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value.slice(0, 100))}
              placeholder="Add a message..."
              className="mt-2 resize-none"
              rows={3}
            />
          </div>
        </div>

        <Button 
          className="w-full py-6 bg-[#13ab6c]"
          disabled={!paymentMethod || !amount || loading}
          onClick={handleDeposit}
        >
          {loading ? "Processing..." : "Send Gift"}
        </Button>
      </div>
    </div>
  );
};

export default GiftDeposit;
