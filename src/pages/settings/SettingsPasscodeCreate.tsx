
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Keypad from "@/components/Keypad";

const SettingsPasscodeCreate: React.FC = () => {
  const navigate = useNavigate();
  const [passcode, setPasscode] = useState("");

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
      setTimeout(() => {
        navigate("/settings/passcode-confirm", { state: { passcode } });
      }, 500);
    }
  }, [passcode, navigate]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-4 pt-12 animate-fade-in">
      <div className="flex items-center w-full mb-4">
        <button className="p-2 mr-2" onClick={() => navigate("/settings/passcode-current")}>
          <svg width={22} height={22} fill="none"><path d="M15 19l-7-7 7-7" stroke="#333" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <h2 className="text-2xl font-bold">Create new passcode</h2>
      </div>
      <div className={`flex gap-3 mb-10 mt-8`}>
        {Array(6).fill(0).map((_, idx) => (
          <div key={idx} className={`w-4 h-4 rounded-full ${idx < passcode.length ? "bg-black" : "bg-gray-200"}`} />
        ))}
      </div>
      <Keypad onKeyPress={handleKeyPress} onBackspace={handleBackspace} />
    </div>
  );
};

export default SettingsPasscodeCreate;
