import { createContext, useContext, useState } from "react";

const ChatContext = createContext();

export function ChatProvider({ children }) {
  const [messages, setMessages] = useState([]);
  return <ChatContext.Provider value={{ messages, setMessages }}>{children}</ChatContext.Provider>;
}

export function useChatContext() {
  return useContext(ChatContext);
}