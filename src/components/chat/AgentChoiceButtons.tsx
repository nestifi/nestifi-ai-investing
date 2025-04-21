
import React from "react";
import { Button } from "@/components/ui/button";

interface Props {
  choices: string[];
  onSelect: (choice: string) => void;
}

const AgentChoiceButtons: React.FC<Props> = ({ choices, onSelect }) => (
  <div className="mt-2 flex flex-wrap gap-2">
    {choices.map(choice => (
      <Button
        key={choice}
        variant="outline"
        size="sm"
        className="bg-white border-primary text-primary"
        onClick={() => onSelect(choice)}
      >
        {choice}
      </Button>
    ))}
  </div>
);

export default AgentChoiceButtons;
