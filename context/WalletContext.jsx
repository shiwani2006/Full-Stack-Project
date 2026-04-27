import { createContext, useContext, useState } from "react";

const WalletContext = createContext();

export function WalletProvider({ children }) {
  const [balance, setBalance] = useState(250);
  return <WalletContext.Provider value={{ balance, setBalance }}>{children}</WalletContext.Provider>;
}

export function useWalletContext() {
  return useContext(WalletContext);
}