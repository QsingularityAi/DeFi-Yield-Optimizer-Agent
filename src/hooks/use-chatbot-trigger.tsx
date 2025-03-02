
import { useState } from 'react';
import { useChatbot } from '@/context/ChatbotContext';
import { toast } from 'sonner';

// Custom event for chatbot communication
export const triggerChatbotQuestion = (question: string) => {
  const event = new CustomEvent('chatbot-question', { detail: { question } });
  window.dispatchEvent(event);
};

// Hook for components to use for opening the chatbot with suggested questions
export const useChatbotTrigger = () => {
  const { openChat } = useChatbot();
  
  const suggestQuestion = (question: string) => {
    openChat();
    
    // Trigger the event after a short delay to ensure the chatbot is open
    setTimeout(() => {
      triggerChatbotQuestion(question);
      
      toast("Question suggested", {
        description: `"${question}" has been added to the chat.`,
      });
    }, 300);
  };
  
  return { suggestQuestion };
};

// Example questions that can be suggested throughout the app
export const suggestedQuestions = {
  yieldOpportunities: "What are the best yield opportunities right now?",
  portfolioAnalysis: "Analyze my current portfolio",
  riskAssessment: "What's the risk level of my current allocation?",
  marketAnalysis: "Give me the latest market analysis",
  strategyComparison: "Compare different DeFi strategies for me",
  dipBuying: "How can I set up a dip buying strategy?",
};
