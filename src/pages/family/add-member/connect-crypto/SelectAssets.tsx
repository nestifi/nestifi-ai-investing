
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface CryptoAsset {
  id: string;
  name: string;
  symbol: string;
  balance: string;
  value: string;
  selected: boolean;
}

const SelectAssets = () => {
  const navigate = useNavigate();
  const [assets, setAssets] = useState<CryptoAsset[]>([
    { id: "1", name: "Bitcoin", symbol: "BTC", balance: "0.25", value: "$15,250.00", selected: false },
    { id: "2", name: "Ethereum", symbol: "ETH", balance: "2.5", value: "$6,750.00", selected: false },
    { id: "3", name: "USD Coin", symbol: "USDC", balance: "1,000", value: "$1,000.00", selected: false },
  ]);
  
  const toggleAssetSelection = (id: string) => {
    setAssets(assets.map(asset => 
      asset.id === id ? { ...asset, selected: !asset.selected } : asset
    ));
  };
  
  const isAnyAssetSelected = assets.some(asset => asset.selected);
  
  const handleContinue = () => {
    // Store selected assets in session storage
    const selectedAssets = assets.filter(asset => asset.selected);
    sessionStorage.setItem("selectedAssets", JSON.stringify(selectedAssets));
    navigate("/family/add-member/connection-success");
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-md mx-auto pt-8">
        <h1 className="text-2xl font-bold mb-6">Select Crypto Assets</h1>
        <p className="text-gray-600 mb-6">
          Choose which assets you want to connect to NestiFi
        </p>

        <div className="space-y-4 mb-8">
          {assets.map((asset) => (
            <Card 
              key={asset.id} 
              className={`overflow-hidden ${asset.selected ? 'border-[#13ab6c]' : ''}`}
            >
              <CardContent className="p-4">
                <div className="flex items-center">
                  <Checkbox 
                    id={`asset-${asset.id}`}
                    checked={asset.selected}
                    onCheckedChange={() => toggleAssetSelection(asset.id)}
                    className="mr-4"
                  />
                  <div className="flex-1">
                    <Label 
                      htmlFor={`asset-${asset.id}`}
                      className="font-medium cursor-pointer"
                    >
                      {asset.name} ({asset.symbol})
                    </Label>
                    <p className="text-sm text-gray-500">{asset.balance} {asset.symbol}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{asset.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Button 
          className="w-full py-6 bg-[#13ab6c]" 
          disabled={!isAnyAssetSelected}
          onClick={handleContinue}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default SelectAssets;
