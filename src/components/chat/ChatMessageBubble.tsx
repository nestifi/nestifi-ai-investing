
import React from "react";
import { User, Bot } from "lucide-react";

interface Props {
  sender: "user" | "agent";
  text: string;
  timestamp?: string;
  confetti?: boolean;
  isTyping?: boolean;
  children?: React.ReactNode;
}

const ChatMessageBubble: React.FC<Props> = ({
  sender,
  text,
  timestamp,
  confetti = false,
  isTyping = false,
  children,
}) => {
  const isUser = sender === "user";
  return (
    <div
      className={
        "flex gap-2 " +
        (isUser ? "justify-end" : "justify-start")
      }
    >
      {/* Agent avatar */}
      {!isUser && (
        <div className="flex flex-col items-center">
          <div className="rounded-full bg-primary p-2">
            <Bot className="h-5 w-5 text-white" />
          </div>
        </div>
      )}

      <div className={"max-w-[80vw] md:max-w-md flex flex-col"}>
        <div
          className={
            "rounded-2xl px-4 py-3 " +
            (isUser
              ? "bg-primary text-white self-end rounded-tr-none"
              : "bg-gray-100 text-gray-900 self-start rounded-tl-none")
          }
        >
          <span className={isTyping ? "italic text-gray-400" : ""}>
            {text.split("\n").map((str, idx) =>
              <span key={idx}>{str}<br /></span>
            )}
          </span>
          {children}
        </div>
        {/* Timestamp (optional) */}
        <span className="text-xs text-gray-400 mt-1 mx-1">
          {timestamp && new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span>
      </div>
      {/* User avatar */}
      {isUser && (
        <div className="flex flex-col items-center">
          <div className="rounded-full bg-primary p-2">
            <User className="h-5 w-5 text-white" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatMessageBubble;
