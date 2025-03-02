
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useNearWallet } from './NearWalletContext';

interface ChatbotContextType {
  isChatOpen: boolean;
  openChat: () => void;
  closeChat: () => void;
  toggleChat: () => void;
  walletConnected: boolean;
  accountId: string | null;
}

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

export const ChatbotProvider = ({ children }: { children: ReactNode }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { isConnected, accountId } = useNearWallet();
  
  const openChat = () => setIsChatOpen(true);
  const closeChat = () => setIsChatOpen(false);
  const toggleChat = () => setIsChatOpen(prev => !prev);
  
  return (
    <ChatbotContext.Provider value={{ 
      isChatOpen, 
      openChat, 
      closeChat, 
      toggleChat,
      walletConnected: isConnected,
      accountId
    }}>
      {children}
    </ChatbotContext.Provider>
  );
};

export const useChatbot = () => {
  const context = useContext(ChatbotContext);
  if (context === undefined) {
    throw new Error('useChatbot must be used within a ChatbotProvider');
  }
  return context;
};
