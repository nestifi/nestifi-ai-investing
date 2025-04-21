
import React from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface KeypadProps {
  onKeyPress: (key: string) => void;
  onDelete: () => void;
}

export const Keypad: React.FC<KeypadProps> = ({ onKeyPress, onDelete }) => {
  const keys = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["", "0", <X className="h-5 w-5" key="backspace" />]
  ];

  const handleKeyClick = (key: string | JSX.Element) => {
    if (typeof key === "string") {
      onKeyPress(key);
    } else {
      onDelete();
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4 mt-8">
      {keys.flat().map((key, index) => (
        <Button
          key={index}
          variant="outline"
          className={`h-16 w-16 text-2xl font-semibold rounded-full ${!key ? 'invisible' : ''}`}
          onClick={() => handleKeyClick(key)}
        >
          {key}
        </Button>
      ))}
    </div>
  );
};
