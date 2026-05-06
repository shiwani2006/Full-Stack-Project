import React, { useState } from "react";
import { sendMessageToAI } from "../../services/sendMessageToAI";

const MessageInput = ({ onSend }) => {
  const [message, setMessage] = useState("");

  const handleSend = async () => {
    if (!message.trim()) return;

    // show user message
    onSend({
      sender: "user",
      text: message
    });

    const userMessage = message;
    setMessage("");

    // AI response
    const aiResponse = await sendMessageToAI(userMessage);

    onSend({
      sender: "ai",
      text: aiResponse.reply,
      providers: aiResponse.providers || [],
      actions: aiResponse.actions || []
    });
  };

  return (
    <div className="message-input">
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask AI for services..."
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default MessageInput;
