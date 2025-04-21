
import React from 'react';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnswerOptionProps {
  label: string;
  selected: boolean;
  correct?: boolean | null;
  incorrect?: boolean | null;
  onSelect: () => void;
  disabled?: boolean;
}

const AnswerOption: React.FC<AnswerOptionProps> = ({ 
  label, 
  selected, 
  correct, 
  incorrect, 
  onSelect, 
  disabled = false 
}) => {
  const baseClasses = "flex items-center p-4 mb-3 border rounded-lg w-full text-left transition-colors";
  
  const getClasses = () => {
    if (correct) {
      return cn(baseClasses, "bg-green-50 border-green-300 text-green-800");
    }
    if (incorrect) {
      return cn(baseClasses, "bg-red-50 border-red-300 text-red-800");
    }
    if (selected) {
      return cn(baseClasses, "bg-primary-50 border-primary text-primary-foreground");
    }
    return cn(baseClasses, "border-gray-200 hover:bg-gray-50");
  };

  return (
    <button
      className={getClasses()}
      onClick={onSelect}
      disabled={disabled}
      type="button"
    >
      <div className="flex-1">{label}</div>
      {correct && <Check className="h-5 w-5 text-green-600 ml-2" />}
      {incorrect && <X className="h-5 w-5 text-red-600 ml-2" />}
    </button>
  );
};

export default AnswerOption;
