
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Gift, BarChart2, Share, Settings, Users, Plus, CalendarPlus, CalendarDays, ArrowDown } from "lucide-react";

// Card slider data (for demonstration, just one for now)
const accountCards = [
  {
    name: "Dan Williams",
    img: "/lovable-uploads/882b5379-6597-47b1-8682-7639bf56287d.png",
    background: "bg-blue-100",
    amount: 30600,
  },
  {
    name: "Anna Parker",
    img: "/placeholder.svg",
    background: "bg-pink-100",
    amount: 15980,
  }
];

// Top actions
const topActions = [
  {
    label: "Gift deposit",
    icon: Gift,
    onClick: (navigate: any) => navigate("/family/gift-deposit"),
  },
  {
    label: "Statistics",
    icon: BarChart2,
    onClick: (navigate: any) => navigate("/statistics"),
  },
  {
    label: "Share payment link",
    icon: Share,
    onClick: (navigate: any) => window.alert("Share payment link"),
  },
  {
    label: "Manage information",
    icon: Settings,
    onClick: (navigate: any) => window.alert("Manage information"),
  },
];

// Secondary actions
const secondaryActions = [
  {
    label: "Invite family or friends",
    icon: Users,
    color: "bg-violet-600 text-white",
    onClick: (navigate: any) => window.alert("Invite family or friends"),
  },
  {
    label: "Set up your first deposit",
    icon: CalendarPlus,
    color: "bg-green-500 text-white",
    onClick: (navigate: any) => window.alert("Set up deposit"),
  },
  {
    label: "Add goal",
    icon: CalendarDays,
    color: "bg-yellow-400 text-white",
    onClick: (navigate: any) => window.alert("Add goal"),
  },
];

// Sample transfers
const transfers = [
  {
    id: 1,
    label: "Deposit to Dan",
    sub: "1 June",
    amount: 100,
    avatarBg: "bg-blue-100",
    icon: ArrowDown,
    avatar: "/lovable-uploads/882b5379-6597-47b1-8682-7639bf56287d.png",
    incoming: true,
  },
  {
    id: 2,
    label: "Gift deposit from Sam",
    sub: "28 May",
    amount: 50,
    avatarBg: "bg-gray-200",
    icon: ArrowDown,
    avatar: "/placeholder.svg",
    incoming: true,
  },
];

const Home = () => {
  const navigate = useNavigate();
  const [activeTransfersTab, setActiveTransfersTab] = useState("past");
  const [activeCard, setActiveCard] = useState(0);

  // Format balance
  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  // Colors for dark background
  return (
    <div className="min-h-screen bg-[#181c22] pb-28">
      {/* Header and title */}
      <div className="w-full px-4 pt-6 flex flex-col items-center">
        <div className="flex w-full items-center justify-between mb-6">
          <button className="rounded-full bg-[#23272f] w-10 h-10 flex items-center justify-center" aria-label="Trophy">
            <Gift className="text-white opacity-80" />
          </button>
          <h1 className="text-white text-xl font-semibold text-center flex-1">Home</h1>
          <button className="rounded-full bg-[#23272f] w-10 h-10 flex items-center justify-center" aria-label="Add">
            <Plus className="text-white opacity-80" />
          </button>
        </div>
        <h2 className="text-white font-bold text-2xl w-full text-left mt-2">Welcome Back, Robert!</h2>
        <p className="text-gray-300 w-full mb-6 mt-1 text-base text-left">Your Financial Goals Are On Track!</p>
      </div>

      {/* Account cards carousel */}
      <div className="relative px-4 mb-8">
        <div className="flex space-x-4 overflow-x-auto pb-2 hide-scrollbar snap-x snap-mandatory">
          {accountCards.map((card, idx) => (
            <div
              key={card.name}
              className={`min-w-[320px] max-w-[350px] snap-center flex-shrink-0 rounded-2xl ${card.background} shadow-md flex items-center p-4`}
              style={{ transition: "background 0.25s" }}
            >
              <Avatar className="h-14 w-14 mr-4 border-4 border-white">
                <AvatarImage src={card.img} alt={card.name} />
                <AvatarFallback>D</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-gray-800 text-lg">{card.name}</p>
                <p className="font-bold text-3xl text-gray-900 tracking-tight">{formatMoney(card.amount)}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Circle indicators */}
        <div className="flex justify-center mt-2 space-x-2">
          {accountCards.map((_, idx) => (
            <span key={idx}
              className={`inline-block w-2 h-2 rounded-full ${idx === activeCard ? "bg-green-600" : "bg-gray-500/30"}`}
            />
          ))}
        </div>
      </div>

      {/* Top action icons */}
      <div className="px-2 grid grid-cols-4 mb-5 gap-y-2">
        {topActions.map((action, idx) => (
          <button
            key={action.label}
            onClick={() => action.onClick(navigate)}
            className="flex flex-col items-center justify-center gap-1 focus:outline-none"
          >
            <div className="rounded-full bg-[#23272f] w-12 h-12 flex items-center justify-center mb-2">
              <action.icon className="h-6 w-6 text-white" />
            </div>
            <span className="text-xs text-gray-300">{action.label}</span>
          </button>
        ))}
      </div>

      {/* Secondary actions - scrollable row */}
      <div className="flex space-x-3 px-4 mb-7 overflow-x-auto hide-scrollbar">
        {secondaryActions.map((action) => (
          <button
            key={action.label}
            onClick={() => action.onClick(navigate)}
            className="flex items-center gap-2 py-3 px-4 rounded-xl border border-[#36393c] bg-[#23272f] hover:opacity-90 transition-colors min-w-[180px]"
            style={{ background: undefined }}
          >
            <span className={`inline-flex rounded-lg p-1 ${action.color}`}>
              <action.icon className="h-6 w-6" />
            </span>
            <span className="flex flex-col text-left">
              <span className="font-medium text-white text-sm">{action.label}</span>
            </span>
          </button>
        ))}
      </div>

      {/* Transfers Block */}
      <div className="rounded-t-3xl bg-white p-4 pt-6">
        <h3 className="mb-4 font-semibold text-xl text-black">Transfers</h3>
        <div className="flex w-full rounded-full overflow-hidden mb-4 border border-gray-200">
          <button
            className={`flex-1 py-2 text-base font-medium ${activeTransfersTab === "past" ? "bg-green-700 text-white" : "bg-transparent text-gray-600"}`}
            onClick={() => setActiveTransfersTab("past")}
          >
            Past
          </button>
          <button
            className={`flex-1 py-2 text-base font-medium ${activeTransfersTab === "upcoming" ? "bg-gray-100 text-gray-600" : "bg-transparent text-gray-400"}`}
            onClick={() => setActiveTransfersTab("upcoming")}
          >
            Upcoming
          </button>
        </div>
        {/* Transfers list (only past for now) */}
        <div className="space-y-3">
          {transfers.map((transfer) => (
            <div key={transfer.id} className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`rounded-full ${transfer.avatarBg} h-12 w-12 flex items-center justify-center mr-3`}>
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={transfer.avatar} alt={transfer.label} />
                    <AvatarFallback>D</AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <p className="font-medium text-black">{transfer.label}</p>
                  <p className="text-xs text-gray-500">{transfer.sub}</p>
                </div>
              </div>
              <p className="font-bold text-lg text-black">{formatMoney(transfer.amount)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom navigation (custom, minimal variant for now) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 h-20 z-50">
        <div className="max-w-md mx-auto h-full flex justify-between items-center px-6">
          <button className="flex flex-col items-center justify-center text-green-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeWidth={2} d="M3 9.75L12 4.5l9 5.25v7.5A2.25 2.25 0 0 1 18.75 19.5H5.25A2.25 2.25 0 0 1 3 17.25V9.75Z" /></svg>
            <span className="text-xs">Home</span>
          </button>
          <button className="flex flex-col items-center justify-center text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="3" y="7" width="18" height="12" rx="2" /><path d="M6 3v4" /><path d="M18 3v4" /></svg>
            <span className="text-xs">Wallet</span>
          </button>
          <button className="flex flex-col items-center justify-center text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z" /><path d="M8.5 16L10.5 12H13.5L15.5 16"/><path d="M12 15V12"/></svg>
            <span className="text-xs">Learn</span>
          </button>
          <button className="flex flex-col items-center justify-center text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" /><text x="12" y="16" textAnchor="middle" fill="#222" fontSize="10" fontWeight="bold" fontFamily="Arial">AI</text></svg>
            <span className="text-xs">Seb</span>
          </button>
          <button className="flex flex-col items-center justify-center text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="8" r="4"/><path d="M12 12c-4.4183 0-8 1.7909-8 4v2h16v-2c0-2.2091-3.5817-4-8-4z" /></svg>
            <span className="text-xs">Account</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
