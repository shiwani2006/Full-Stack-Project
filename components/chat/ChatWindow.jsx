import React, { useState } from "react";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";

const ChatWindow = () => {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello 👋 I'm Society Copilot. Ask me for service recommendations."
    }
  ]);

  const addMessage = (msg) => {
    setMessages((prev) => [...prev, msg]);
  };

  return (
    <div className="chat-window">
      <div className="chat-messages">
        {messages.map((msg, i) => (
          <MessageBubble key={i} message={msg} />
        ))}
      </div>

      <MessageInput onSend={addMessage} />
    </div>
  );
};

export default ChatWindow;