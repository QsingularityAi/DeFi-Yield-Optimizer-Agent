
import React, { useState, useEffect } from 'react';
import { Wallet, BarChart3, PieChart, RefreshCw, MessageSquare } from 'lucide-react';
import StatCard from '@/components/ui/StatCard';
import ProtocolCard from '@/components/ui/ProtocolCard';
import StrategySelector from '@/components/ui/StrategySelector';
import AllocationChart from '@/components/ui/AllocationChart';
import MarketChart from '@/components/ui/MarketChart';
import { useChatbotTrigger, suggestedQuestions } from '@/hooks/use-chatbot-trigger';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [strategy, setStrategy] = useState<'conservative' | 'balanced' | 'aggressive'>('balanced');
  const { suggestQuestion } = useChatbotTrigger();
  
  // Mock data - In real app, this would come from API
  const portfolioData = {
    totalValue: '$12,450.32',
    dailyChange: { value: '2.3%', positive: true },
    totalYield: '$345.21',
    yieldChange: { value: '12.5%', positive: true },
    apy: '8.2%',
    apyChange: { value: '0.5%', positive: false }
  };
  
  const mockProtocols = [
    { name: 'Ref Finance', apy: 7.2, tvl: '$32.5M', risk: 'Medium' as const, allocation: 40 },
    { name: 'Burrow', apy: 10.5, tvl: '$18.9M', risk: 'High' as const, allocation: 35 },
    { name: 'Meta Pool', apy: 4.8, tvl: '$45.2M', risk: 'Low' as const, allocation: 25 }
  ];
  
  const allocationData = [
    { name: 'Ref Finance', value: 40, color: '#4f46e5' },
    { name: 'Burrow', value: 35, color: '#16a34a' },
    { name: 'Meta Pool', value: 25, color: '#8b5cf6' }
  ];
  
  const marketData = Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    value: 5000 + Math.random() * 1500
  }));
  
  useEffect(() => {
    // Simulate API loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh] animate-fade-in">
        <div className="text-center">
          <div className="loading-dots mx-auto">
            <div></div>
            <div></div>
            <div></div>
          </div>
          <p className="mt-4 text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Overview of your yield optimization agent</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => suggestQuestion(suggestedQuestions.portfolioAnalysis)}
            className="flex items-center space-x-1 text-sm px-3 py-1.5 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
          >
            <MessageSquare size={14} />
            <span>Analyze Portfolio</span>
          </button>
          <button 
            onClick={() => suggestQuestion(suggestedQuestions.yieldOpportunities)}
            className="flex items-center space-x-1 text-sm px-3 py-1.5 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
          >
            <MessageSquare size={14} />
            <span>Find Yield Opportunities</span>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard 
          title="Portfolio Value" 
          value={portfolioData.totalValue} 
          change={portfolioData.dailyChange}
          icon={<Wallet size={18} />}
        />
        <StatCard 
          title="Total Yield" 
          value={portfolioData.totalYield} 
          change={portfolioData.yieldChange}
          icon={<BarChart3 size={18} />}
        />
        <StatCard 
          title="Current APY" 
          value={portfolioData.apy} 
          change={portfolioData.apyChange}
          icon={<PieChart size={18} />}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card border rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Yield Performance</h2>
            <MarketChart data={marketData} />
          </div>
          
          <div className="bg-card border rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Your Strategy</h2>
              <button 
                className="flex items-center text-sm text-primary"
                onClick={() => suggestQuestion(suggestedQuestions.strategyComparison)}
              >
                <MessageSquare size={14} className="mr-1" /> 
                Compare Strategies
              </button>
            </div>
            <StrategySelector selected={strategy} onChange={setStrategy} />
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-card border rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Current Allocation</h2>
              <button 
                className="flex items-center text-sm text-primary"
                onClick={() => suggestQuestion(suggestedQuestions.riskAssessment)}
              >
                <MessageSquare size={14} className="mr-1" /> 
                Assess Risk
              </button>
            </div>
            <AllocationChart data={allocationData} />
          </div>
          
          <div className="bg-card border rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Active Protocols</h2>
              <button 
                className="flex items-center text-sm text-primary"
                onClick={() => suggestQuestion(suggestedQuestions.marketAnalysis)}
              >
                <MessageSquare size={14} className="mr-1" /> 
                Market Analysis
              </button>
            </div>
            <div className="space-y-3">
              {mockProtocols.map((protocol) => (
                <ProtocolCard key={protocol.name} {...protocol} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
