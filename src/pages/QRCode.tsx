
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Copy, Check } from "lucide-react";
import { toast } from "@/components/ui/sonner";

const QRCode = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  
  // In a real app, this would be a real QR code representing a user ID, payment request, etc.
  const qrImageUrl = "/placeholder.svg";
  const qrCodeValue = "NESTIFI-USER-12345-ABCDE";
  
  const handleCopy = () => {
    navigator.clipboard.writeText(qrCodeValue)
      .then(() => {
        setCopied(true);
        toast.success("Code copied to clipboard");
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error("Failed to copy: ", err);
        toast.error("Failed to copy code");
      });
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
          <h1 className="text-2xl font-bold">Your QR Code</h1>
        </div>
        
        <Card className="mb-6">
          <CardContent className="p-6 flex flex-col items-center">
            <div className="mb-6 w-64 h-64 relative">
              <img 
                src={qrImageUrl} 
                alt="QR Code" 
                className="w-full h-full object-contain"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white p-2 rounded-md">
                  <p className="text-xs text-gray-500">Sample QR Code</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center bg-gray-100 w-full p-3 rounded-md mb-4">
              <p className="text-sm flex-1 font-mono truncate">{qrCodeValue}</p>
              <Button 
                variant="ghost" 
                size="sm" 
                className="ml-2 text-gray-500" 
                onClick={handleCopy}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            
            <p className="text-sm text-gray-500 text-center">
              Share this QR code with others to receive payments or connect to your NestiFi account
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QRCode;
