
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Power, Settings, User, Key, Bell, Info, Wallet, Shield } from "lucide-react";
import DeactivateAccountModal from "./DeactivateAccountModal";
import LogoutModal from "./LogoutModal";
import BottomNavbar from "@/components/layout/BottomNavbar";

const AVATAR_URL = "/lovable-uploads/4a5e9e5a-84f1-49b7-992f-28e1e16b2dfe.png"; // Provided sample user image

const menu = [
  // Main sections
  {
    title: "Personal information",
    icon: User,
    route: "/settings/personal-details"
  },
  {
    title: "Change passcode",
    icon: Key,
    route: "/settings/passcode-current"
  },
  {
    title: "Bank accounts",
    icon: Wallet,
    route: "/" // Not implemented
  },
  {
    title: "Notifications",
    icon: Bell,
    route: "/settings/notifications"
  },
  {
    title: "Support",
    icon: Shield,
    route: "/" // Not implemented
  },
  {
    title: "About",
    icon: Info,
    route: "/" // Not implemented
  }
];

const SettingsMain: React.FC = () => {
  const navigate = useNavigate();
  const [showDeactivate, setShowDeactivate] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-white pb-20">
      {/* Header */}
      <div className="pt-8 pb-3 px-4 flex flex-col items-center relative">
        <img
          src={AVATAR_URL}
          alt="Profile"
          className="w-20 h-20 rounded-full border-4 border-white shadow -mt-8"
        />
        <div className="mt-2 text-xl font-bold">Robert Williams</div>
      </div>
      
      {/* Menu */}
      <div className="flex flex-col gap-1 my-2 px-4">
        <div className="rounded-2xl bg-gray-50 p-2">
          {menu.map((item, idx) => (
            <button
              key={item.title}
              className="flex items-center w-full px-3 py-4 bg-transparent hover:bg-gray-100 rounded-xl transition mb-0.5"
              onClick={() => item.route !== "/" && navigate(item.route)}
              disabled={item.route === "/"}
            >
              <div className="bg-green-50 rounded-full p-2 mr-3">
                <item.icon className="text-emerald-700" />
              </div>
              <span className="flex-1 text-left font-medium text-gray-900">{item.title}</span>
              <span className="text-gray-300">
                <svg width="9" height="16" fill="none"><path d="M2 2l6 6-6 6" stroke="#BDBDBD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
            </button>
          ))}
        </div>
      </div>
      {/* Account Actions */}
      <div className="flex-1"></div>
      <div className="flex flex-col items-center space-y-2 mt-auto pb-24">
        <button
          className="text-red-600 font-semibold text-base py-2"
          onClick={() => setShowDeactivate(true)}
        >
          Deactivate account
        </button>
        <button
          className="text-red-600 font-semibold text-base py-2"
          onClick={() => setShowLogout(true)}
        >
          Log out
        </button>
      </div>
      <DeactivateAccountModal open={showDeactivate} onOpenChange={setShowDeactivate} />
      <LogoutModal open={showLogout} onOpenChange={setShowLogout} />
      <BottomNavbar />
    </div>
  );
};

export default SettingsMain;
