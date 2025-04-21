
import React, { useRef, useState, useEffect } from "react";
import ChatMessageBubble from "../components/chat/ChatMessageBubble";
import ChatInputBar from "../components/chat/ChatInputBar";
import AgentChoiceButtons from "../components/chat/AgentChoiceButtons";
import { Bot } from "lucide-react"; // Visual header icon

// Message structure for state/history
export interface Message {
  id: string;
  sender: "user" | "agent";
  text: string;
  timestamp: string;
  choices?: string[]; // for agent interactive replies
  chartData?: { x: number; y: number }[]; // for chart replies (future)
  confetti?: boolean;
}

const initialAgentMessage: Message = {
  id: "welcome-1",
  sender: "agent",
  text: "Hi, I'm Sebastian—your personal AI advisor. How can I help you today?",
  timestamp: new Date().toISOString(),
  choices: [
    "How can I save for college?",
    "What are investment options?",
    "Show me my recent contributions."
  ],
};

const AIAgentChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([initialAgentMessage]);
  const [loading, setLoading] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new message
  useEffect(() => {
    chatContainerRef.current?.scrollTo({ top: chatContainerRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  // Simulate agent response (placeholder)
  const simulateAgentReply = (userText: string) => {
    setLoading(true);
    setTimeout(() => {
      let response: Message;
      if (userText.toLowerCase().includes("save for college")) {
        response = {
          id: Math.random().toString(),
          sender: "agent",
          text: "Saving for college can be easier with a trusted plan. Consider a 529 plan or automated deposits into an Edu Saver. Want more details?",
          timestamp: new Date().toISOString(),
        };
      } else if (userText.toLowerCase().includes("contributions")) {
        response = {
          id: Math.random().toString(),
          sender: "agent",
          text: "Your latest contributions:\n- $50 saved to College Fund\n- $30 saved to Investments\nGreat job! Ready to discuss your next goal?",
          timestamp: new Date().toISOString(),
          confetti: true,
        };
        setConfetti(true);
        setTimeout(() => setConfetti(false), 3000);
      } else {
        response = {
          id: Math.random().toString(),
          sender: "agent",
          text: "I'm not sure about that. Here are some areas I can help with:\n- Budgeting Tips\n- Investment Basics\n- Credit Building\n\nWould you like to talk to a human?",
          timestamp: new Date().toISOString(),
          choices: ["Contact Support", "Ask a human"],
        };
      }
      setMessages((prev) => [...prev, response]);
      setLoading(false);
    }, 1200);
  };

  // Handle sending user message
  const handleSendMessage = (userText: string) => {
    const message: Message = {
      id: Math.random().toString(),
      sender: "user",
      text: userText,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, message]);
    simulateAgentReply(userText);
  };

  // Handle tapping choice button in agent reply
  const handleChoiceClick = (choice: string) => {
    handleSendMessage(choice);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 shadow bg-white/90 sticky top-0 z-10">
        <Bot className="h-7 w-7 text-primary" />
        <span className="font-semibold text-xl tracking-tight">NestiFi Assistant</span>
        <div className="flex-1" />
        {/* (Optional) Back button could go here */}
      </div>

      {/* Message List */}
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto px-2 pb-2 pt-2">
        {messages.map((msg) => (
          <div key={msg.id} className="mb-2">
            <ChatMessageBubble
              sender={msg.sender}
              text={msg.text}
              timestamp={msg.timestamp}
              confetti={msg.confetti}
            >
              {/* Show choice buttons below this agent message if available */}
              {msg.choices && (
                <AgentChoiceButtons
                  choices={msg.choices}
                  onSelect={handleChoiceClick}
                />
              )}
            </ChatMessageBubble>
          </div>
        ))}
        {loading && (
          <ChatMessageBubble
            sender="agent"
            text="Sebastian is thinking..."
            timestamp={new Date().toISOString()}
            isTyping
          />
        )}
      </div>

      {/* Confetti overlay if triggered */}
      {confetti && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
          <img
            src="/lovable-uploads/70473236-8ba7-4034-8e0f-9a5216ba3789.png"
            alt="Confetti"
            className="w-80 h-44 object-contain animate-fade-in"
          />
        </div>
      )}

      {/* Input Bar */}
      <div className="sticky bottom-0 w-full bg-white border-t border-gray-200 p-2 z-10">
        <ChatInputBar onSend={handleSendMessage} loading={loading} />
      </div>

      {/* (Optional) Bottom nav tab bar here */}
    </div>
  );
};

export default AIAgentChat;
