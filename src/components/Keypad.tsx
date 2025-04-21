
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface KeypadProps {
  onKeyPress: (value: string) => void;
  onBackspace: () => void;
}

const Keypad = ({ onKeyPress, onBackspace }: KeypadProps) => {
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", ""];

  return (
    <div className="grid grid-cols-3 gap-4 w-full max-w-xs">
      {keys.map((key, index) => {
        if (key === "") {
          if (index === 10) {
            return <div key={index} className="w-16 h-16" />;
          }
          return (
            <Button
              key={index}
              variant="outline"
              size="icon"
              className="w-16 h-16 rounded-full flex items-center justify-center"
              onClick={onBackspace}
            >
              <X className="h-6 w-6" />
            </Button>
          );
        }
        
        return (
          <Button
            key={index}
            variant="outline"
            className="w-16 h-16 rounded-full text-xl"
            onClick={() => onKeyPress(key)}
          >
            {key}
          </Button>
        );
      })}
    </div>
  );
};

export default Keypad;
