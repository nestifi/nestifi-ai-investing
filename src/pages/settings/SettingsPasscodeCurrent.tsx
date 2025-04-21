
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Keypad from "@/components/Keypad";
import { toast } from "@/components/ui/sonner";

const CURRENT_PASSCODE = "123456"; // Simulated current passcode

const SettingsPasscodeCurrent: React.FC = () => {
  const navigate = useNavigate();
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState(false);

  function handleKeyPress(val: string) {
    if (passcode.length < 6) {
      setPasscode(passcode + val);
    }
  }
  function handleBackspace() {
    setPasscode(p => p.slice(0, -1));
  }

  React.useEffect(() => {
    if (passcode.length === 6) {
      if (passcode === CURRENT_PASSCODE) {
        setTimeout(() => { navigate("/settings/passcode-create"); }, 350);
      } else {
        setError(true);
        toast.error("Incorrect passcode");
        setTimeout(() => { setPasscode(""); setError(false); }, 800);
      }
    }
  }, [passcode, navigate]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-start px-4 pt-12 animate-fade-in">
      <div className="flex items-center w-full mb-4">
        <button className="p-2 mr-2" onClick={() => navigate("/settings")}>
          <svg width={22} height={22} fill="none"><path d="M15 19l-7-7 7-7" stroke="#333" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <h2 className="text-2xl font-bold">Enter current passcode</h2>
      </div>
      <div className={`flex gap-3 mb-10 mt-8`}>
        {Array(6).fill(0).map((_, idx) => (
          <div key={idx} className={`w-4 h-4 rounded-full ${error
            ? "bg-red-400"
            : idx < passcode.length ? "bg-black" : "bg-gray-200"
          }`} />
        ))}
      </div>
      <Keypad onKeyPress={handleKeyPress} onBackspace={handleBackspace} />
    </div>
  );
};

export default SettingsPasscodeCurrent;
