
import React, { useState } from "react";
import { Send, Mic, Paperclip } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  onSend: (message: string) => void;
  loading?: boolean;
}

const ChatInputBar: React.FC<Props> = ({ onSend, loading }) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!loading && text.trim() !== "") {
      onSend(text.trim());
      setText("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-end gap-2 w-full max-w-2xl mx-auto">
      {/* Attach and Mic Buttons (placeholders) */}
      <button
        type="button"
        className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
        aria-label="Attach file"
        tabIndex={-1}
        disabled
      >
        <Paperclip className="h-5 w-5 text-gray-500" />
      </button>
      <textarea
        className="min-h-[42px] max-h-36 flex-1 rounded-lg border border-gray-200 px-3 py-2 text-base bg-gray-50 resize-none focus:outline-none focus:ring-2 focus:ring-primary"
        placeholder="Enter your message"
        rows={1}
        value={text}
        disabled={loading}
        onChange={e => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        aria-label="Message input"
      />
      <button
        type="button"
        onClick={handleSend}
        disabled={loading || text.trim() === ""}
        className={cn(
          "p-2 rounded-lg bg-primary hover:bg-primary/90 transition text-white flex items-center",
          (loading || text.trim() === "") && "opacity-60 cursor-not-allowed"
        )}
        aria-label="Send"
      >
        <Send className="h-5 w-5" />
      </button>
      {/* Mic button (for future) */}
      <button
        type="button"
        className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
        aria-label="Voice input"
        tabIndex={-1}
        disabled
      >
        <Mic className="h-5 w-5 text-gray-500" />
      </button>
    </div>
  );
};

export default ChatInputBar;
