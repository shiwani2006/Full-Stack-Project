import React, { useState } from "react";
import "./AIChat.css";
import { sendMessageToAI } from "../../services/aiService";

import AIMessage from "./AIMessage";
import UserMessage from "./UserMessage";
import SuggestionCards from "./SuggestionCards";

const AIChat = () => {
  const [messages, setMessages] = useState([
    { type: "ai", text: "Hello 👋 What can I help you with today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async (msg = input) => {
    if (!msg.trim()) return;

    const newMessages = [...messages, { type: "user", text: msg }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    const res = await sendMessageToAI(msg);

    setTimeout(() => {
      setMessages([
        ...newMessages,
        {
          type: "ai",
          text: res.reply,
          providers: res.providers,
          actions: res.actions
        }
      ]);
      setLoading(false);
    }, 600);
  };

  return (
    <div className="ai-chat-container">
      <div className="ai-header">AI Service Assistant</div>

      <div className="ai-chat-body">
        {messages.map((msg, index) =>
          msg.type === "ai" ? (
            <AIMessage key={index} data={msg} onAction={handleSend} />
          ) : (
            <UserMessage key={index} text={msg.text} />
          )
        )}

        {messages.length === 1 && (
          <SuggestionCards onSelect={handleSend} />
        )}

        {loading && <div className="typing">AI is typing...</div>}
      </div>

      <div className="ai-input-box">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={() => handleSend()}>Send</button>
      </div>
    </div>
  );
};

export default AIChat;