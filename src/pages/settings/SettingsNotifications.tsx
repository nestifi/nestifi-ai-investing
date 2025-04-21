
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Switch } from "@/components/ui/switch";

interface Notification {
  key: string;
  label: string;
  desc: string;
}

const notifications: Notification[] = [
  {
    key: "general",
    label: "General Notifications",
    desc: "Receive updates and important announcements."
  },
  {
    key: "transaction",
    label: "Transaction Alerts",
    desc: "Be notified about successful transactions and transfers"
  },
  {
    key: "savings",
    label: "Savings Reminders",
    desc: "Get reminders to deposit for your savings goals."
  },
  {
    key: "tips",
    label: "Tips & Advice",
    desc: "Receive personalized tips from Seb to optimize your savings."
  },
  {
    key: "push",
    label: "Push Notifications",
    desc: "Receive updates and important announcements."
  }
];

const initialState = {
  general: true,
  transaction: true,
  savings: false,
  tips: true,
  push: false,
};

const SettingsNotifications: React.FC = () => {
  const navigate = useNavigate();
  const [prefs, setPrefs] = useState(initialState);

  function toggle(key: keyof typeof prefs) {
    setPrefs({ ...prefs, [key]: !prefs[key] });
    // simulate save
  }

  return (
    <div className="flex flex-col min-h-screen bg-white pb-12 animate-fade-in">
      {/* Header */}
      <div className="pt-8 flex items-center mb-4 px-4">
        <button className="mr-3 p-2" onClick={() => navigate("/settings")}>
          <svg width={22} height={22} fill="none"><path d="M15 19l-7-7 7-7" stroke="#333" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <h2 className="text-2xl font-bold">Settings</h2>
      </div>
      <div className="flex-1 flex flex-col px-4">
        <div className="rounded-2xl bg-gray-50 py-4 px-3">
          {notifications.map((n, i) => (
            <div key={n.key} className={`flex items-center justify-between py-3 ${i!==0 ? "border-t" : ""}`}>
              <div>
                <div className="font-semibold text-lg">{n.label}</div>
                <div className="text-gray-400 text-base">{n.desc}</div>
              </div>
              <Switch checked={prefs[n.key as keyof typeof prefs]} onCheckedChange={()=>toggle(n.key as keyof typeof prefs)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingsNotifications;
