
import React, { useState, useRef, useEffect } from 'react';
import { X, Send, MessageSquare, ChevronDown, ChevronUp, Bot, User } from 'lucide-react';
import { toast } from 'sonner';

interface ChatMessage {
  role: 'assistant' | 'user';
  content: string;
}

interface ChatbotInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatbotInterface = ({ isOpen, onClose }: ChatbotInterfaceProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      role: 'assistant', 
      content: "Hello! I'm your DeFi advisor. How can I help optimize your crypto investments today?" 
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isExpanded, setIsExpanded] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom of messages when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Listen for chatbot question events
  useEffect(() => {
    const handleChatbotQuestion = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail && customEvent.detail.question) {
        const question = customEvent.detail.question;
        setInputMessage(question);
        
        // Auto-send the question after a brief delay
        setTimeout(() => {
          setInputMessage('');
          const userMessage = { role: 'user' as const, content: question };
          setMessages(prev => [...prev, userMessage]);
          
          // Process the message
          setIsLoading(true);
          setTimeout(() => {
            const botResponse = processUserMessage(question);
            setMessages(prev => [...prev, { role: 'assistant', content: botResponse }]);
            setIsLoading(false);
          }, 1000);
        }, 500);
      }
    };
    
    window.addEventListener('chatbot-question', handleChatbotQuestion);
    
    return () => {
      window.removeEventListener('chatbot-question', handleChatbotQuestion);
    };
  }, []);
  
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessage = { role: 'user' as const, content: inputMessage };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    
    // Simulate API delay for response
    setTimeout(() => {
      // Process message and get response (this would call your actual chatbot agent)
      const botResponse = processUserMessage(userMessage.content);
      
      // Add bot response
      setMessages(prev => [...prev, { role: 'assistant', content: botResponse }]);
      setIsLoading(false);
    }, 1000);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  // Mock function to process user message and return response
  // This would be replaced with your actual DefiAdvisorChatbot implementation
  const processUserMessage = (message: string) => {
    // Basic intent matching for demo purposes
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return "Hello! I'm your DeFi advisor. How can I help optimize your crypto investments today?";
    }
    
    if (lowerMessage.includes('yield') || lowerMessage.includes('apy') || lowerMessage.includes('interest')) {
      return "🔍 **Top Yield Opportunities**\n\n1. **Ref Finance - NEAR/USDC**\n   • APY: 18.5%\n   • Risk: Medium\n   • TVL: $6.2M\n   • Tokens: NEAR, USDC\n\n2. **Burrow - NEAR**\n   • APY: 12.7%\n   • Risk: Medium\n   • TVL: $4.8M\n   • Tokens: NEAR\n\nWould you like me to explain how to optimize your position in any of these protocols?";
    }
    
    if (lowerMessage.includes('risk') || lowerMessage.includes('safe')) {
      return "When evaluating DeFi risks, I consider several factors:\n\n1. **Protocol Security**: Audit history, TVL stability, and development team reputation\n2. **Smart Contract Risk**: Code complexity and vulnerability history\n3. **Market Risk**: Volatility and correlation between assets\n4. **Impermanent Loss Risk**: For liquidity provision strategies\n5. **Liquidation Risk**: For lending/borrowing strategies\n\nIs there a specific protocol or strategy you'd like me to assess?";
    }
    
    if (lowerMessage.includes('strategy') || lowerMessage.includes('recommend')) {
      return "Based on your preferences and market conditions, I recommend these strategies:\n\n**1. Automated Market Making**\nProvide liquidity to trading pairs and earn fees from trades.\n\n• Risk Level: Medium\n• Potential Return: 8-30% APY\n• Time Commitment: Low\n\n• Recommended Protocols: Ref Finance\n• Approach: Mix of stablecoin and blue-chip token pairs\n\nWould you like me to help you implement this strategy?";
    }
    
    if (lowerMessage.includes('market') || lowerMessage.includes('analysis')) {
      return "📊 **Current Market Analysis**\n\n• NEAR Price: $2.34 (+3.2%)\n• Total NEAR DeFi TVL: $168.3M (-1.5%)\n• Average Market APY: 7.8% (+0.3%)\n\n**Key Trends:**\n• Lending protocols showing increased APYs due to higher borrowing demand\n• Slight TVL decline in some DEXs over the past 72 hours\n\nBased on these conditions, lending protocols offer attractive opportunities right now.";
    }
    
    if (lowerMessage.includes('portfolio')) {
      return "📊 **Portfolio Analysis**\n\nTotal Value: $12,450.32\n\n**Current Allocation:**\n• Ref Finance: 40% ($4,980.13)\n• Burrow: 35% ($4,357.61)\n• Meta Pool: 25% ($3,112.58)\n\n**Market Trend:** Bullish with low volatility\n\n**Recommendations:**\n• Increase allocation in Burrow (NEAR Supply): Strong lending demand\n• Maintain current exposure to Meta Pool: Stable yields\n\nWould you like me to help optimize your portfolio based on these insights?";
    }
    
    if (lowerMessage.includes('help') || lowerMessage.includes('features') || lowerMessage.includes('guide')) {
      return "I can help with various DeFi strategies including: \n• Portfolio optimization \n• Yield farming recommendations \n• Market making strategies \n• DCA setup \n• Dip buying automation \n• Risk assessment \n\nJust ask me about any of these topics!";
    }
    
    if (lowerMessage.includes('dip') || lowerMessage.includes('buying')) {
      return "📉 **Automated Dip Buying**\n\nAutomated dip buying sets up rules to purchase assets when prices drop by certain percentages.\n\n• Risk Level: Medium\n• Time Commitment: Very Low\n• Automation Level: High\n\n**How It Works:**\nOur agent monitors your selected assets and automatically executes purchases when prices drop by your specified percentages. This lets you capitalize on market dips without constantly watching the markets.\n\n**Recommended Approach:**\n• Tokens: NEAR, ETH, AURORA\n• Triggers: 10-20% drops from recent highs\n• Allocation: Moderate portions (10-15% of available capital per trigger)\n\nWould you like me to help you set up an automated dip-buying strategy?";
    }
    
    if (lowerMessage.includes('compare') || lowerMessage.includes('comparison')) {
      return "**Strategy Comparison**\n\nBased on your medium risk profile, here's how different strategies compare:\n\n| Strategy | Risk | Returns | Time Required | Best For |\n|----------|------|---------|---------------|----------|\n| Yield Farming | Medium | 5-20% APY | Medium | Passive income |\n| Market Making | Medium-High | 8-30% APY | Low | Fee generation |\n| DCA | Low | Varies | Very Low | Long-term growth |\n| Dip Buying | Medium | Varies | Very Low | Volatility opportunity |\n\n**My Recommendation:**\nA combination of Yield Farming (60%) and Dollar Cost Averaging (40%) would provide balanced returns with manageable risk.\n\nWould you like to see a more detailed analysis of any particular strategy?";
    }
    
    // Default response
    return "I'm not sure I understand. Would you like to know about yield optimization strategies, market analysis, or portfolio recommendations? Or type 'help' to see what I can assist with.";
  };
  
  // Simple markdown-like formatting for messages
  const formatMessage = (content: string) => {
    // Handle bold text with **
    let formatted = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Handle bullet points
    formatted = formatted.replace(/^•\s(.*)$/gm, '<li>$1</li>');
    formatted = formatted.replace(/<li>(.*?)<\/li>/g, '<ul><li>$1</li></ul>');
    // Clean up multiple ul tags
    formatted = formatted.replace(/<\/ul><ul>/g, '');
    
    // Handle new lines
    formatted = formatted.replace(/\n/g, '<br />');
    
    return formatted;
  };
  
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    
    if (!isExpanded) {
      toast("Chat window expanded", {
        description: "You can now see your full conversation history.",
      });
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col shadow-lg rounded-xl border bg-card w-[350px] max-w-[95vw]">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-primary/20 text-primary flex items-center justify-center mr-2">
            <Bot size={18} />
          </div>
          <div>
            <h3 className="font-medium">DeFi Advisor</h3>
            <p className="text-xs text-muted-foreground">Ask about strategies, risks, and opportunities</p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <button 
            onClick={toggleExpand} 
            className="p-1.5 rounded-full hover:bg-secondary text-muted-foreground"
            aria-label={isExpanded ? "Minimize chat" : "Expand chat"}
          >
            {isExpanded ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
          </button>
          <button 
            onClick={onClose} 
            className="p-1.5 rounded-full hover:bg-secondary text-muted-foreground"
            aria-label="Close chat"
          >
            <X size={16} />
          </button>
        </div>
      </div>
      
      {/* Chat Messages */}
      {isExpanded && (
        <div className="flex-1 overflow-y-auto p-3 max-h-[400px] min-h-[300px]">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`mb-3 flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`
                max-w-[80%] rounded-lg p-3
                ${message.role === 'user' 
                  ? 'bg-primary text-primary-foreground ml-4' 
                  : 'bg-secondary border mr-4'}
              `}>
                {message.role === 'assistant' ? (
                  <div dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }} />
                ) : (
                  <p>{message.content}</p>
                )}
              </div>
              <div className={`
                h-8 w-8 rounded-full flex items-center justify-center text-xs
                ${message.role === 'user' 
                  ? 'bg-primary/20 text-primary' 
                  : 'bg-secondary text-muted-foreground'}
              `}>
                {message.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start mb-3">
              <div className="max-w-[80%] rounded-lg p-3 bg-secondary border mr-4">
                <div className="loading-dots">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
              <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-xs text-muted-foreground">
                <Bot size={16} />
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      )}
      
      {/* Input Area */}
      <div className="border-t p-3">
        <div className="flex items-center">
          <textarea
            className="flex-1 p-2 bg-background resize-none min-h-[40px] max-h-[100px] rounded-lg border focus:outline-none"
            placeholder="Ask about DeFi strategies..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className={`ml-2 p-2 rounded-full ${
              inputMessage.trim() && !isLoading
                ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                : 'bg-secondary text-muted-foreground'
            }`}
            aria-label="Send message"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotInterface;
