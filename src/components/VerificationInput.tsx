
import React, { useRef, useState, useEffect } from "react";

interface VerificationInputProps {
  length: number;
  onChange: (code: string) => void;
}

export const VerificationInput: React.FC<VerificationInputProps> = ({ length, onChange }) => {
  const [code, setCode] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Set refs array with the correct length
    inputRefs.current = inputRefs.current.slice(0, length);
    
    // Focus on first input when component mounts
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [length]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    
    // Only take the last character if someone pastes multiple digits
    const singleChar = value.slice(-1);
    
    if (!/^\d*$/.test(singleChar)) return;
    
    const newCode = [...code];
    newCode[index] = singleChar;
    setCode(newCode);
    
    // Notify parent component
    onChange(newCode.join(""));
    
    // Auto-advance to next input if this one has a value
    if (singleChar !== "" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    // On backspace, clear the current input and move to previous if empty
    if (e.key === "Backspace") {
      if (code[index] === "" && index > 0) {
        const newCode = [...code];
        newCode[index - 1] = "";
        setCode(newCode);
        inputRefs.current[index - 1]?.focus();
        
        // Notify parent component
        onChange(newCode.join(""));
      } else if (code[index] !== "") {
        const newCode = [...code];
        newCode[index] = "";
        setCode(newCode);
        
        // Notify parent component
        onChange(newCode.join(""));
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim();
    
    // Only proceed if pasted content is numeric and not longer than our inputs
    if (!/^\d+$/.test(pastedData) || pastedData.length > length) return;
    
    // Fill in as many inputs as we have characters
    const newCode = [...code];
    for (let i = 0; i < Math.min(pastedData.length, length); i++) {
      newCode[i] = pastedData[i];
    }
    
    setCode(newCode);
    onChange(newCode.join(""));
    
    // Focus on the input after the last filled one or the last input
    const focusIndex = Math.min(pastedData.length, length - 1);
    inputRefs.current[focusIndex]?.focus();
  };

  return (
    <div className="flex justify-between gap-2">
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={1}
          className="w-12 h-12 text-center text-2xl font-semibold border border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary"
          value={code[index]}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
        />
      ))}
    </div>
  );
};
