
import React from 'react';
import { MessageSquareText } from 'lucide-react';
import ChatbotInterface from './ChatbotInterface';
import { useChatbot } from '@/context/ChatbotContext';

const ChatbotButton = () => {
  const { isChatOpen, toggleChat, closeChat } = useChatbot();

  return (
    <>
      <button
        onClick={toggleChat}
        className="fixed bottom-4 right-4 z-50 h-12 w-12 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors"
        aria-label="Chat with DeFi Advisor"
      >
        <MessageSquareText size={22} />
      </button>
      
      <ChatbotInterface isOpen={isChatOpen} onClose={closeChat} />
    </>
  );
};

export default ChatbotButton;
