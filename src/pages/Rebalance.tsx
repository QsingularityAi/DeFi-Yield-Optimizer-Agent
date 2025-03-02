
import React, { useState, useEffect } from 'react';
import { ArrowRightLeft, CheckCircle2, Info, AlertTriangle, MessageSquare } from 'lucide-react';
import AllocationChart from '@/components/ui/AllocationChart';
import { useChatbotTrigger, suggestedQuestions } from '@/hooks/use-chatbot-trigger';

const Rebalance = () => {
  const [loading, setLoading] = useState(true);
  const [calculating, setCalculating] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [success, setSuccess] = useState(false);
  const { suggestQuestion } = useChatbotTrigger();
  
  // Mock data
  const currentAllocation = [
    { name: 'Ref Finance', value: 40, color: '#4f46e5' },
    { name: 'Burrow', value: 35, color: '#16a34a' },
    { name: 'Meta Pool', value: 25, color: '#8b5cf6' }
  ];
  
  const optimalAllocation = [
    { name: 'Ref Finance', value: 30, color: '#4f46e5' },
    { name: 'Burrow', value: 45, color: '#16a34a' },
    { name: 'Meta Pool', value: 25, color: '#8b5cf6' }
  ];
  
  const transactions = [
    { from: 'Ref Finance', to: 'Burrow', amount: '$124.50', gas: '$0.12' }
  ];
  
  useEffect(() => {
    // Simulate API loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleCalculate = () => {
    setCalculating(true);
    
    // Simulate calculation time
    setTimeout(() => {
      setCalculating(false);
      setConfirming(true);
    }, 2000);
  };
  
  const handleConfirm = () => {
    setCalculating(true);
    
    // Simulate transaction time
    setTimeout(() => {
      setCalculating(false);
      setConfirming(false);
      setSuccess(true);
    }, 3000);
  };
  
  const handleReset = () => {
    setSuccess(false);
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh] animate-fade-in">
        <div className="text-center">
          <div className="loading-dots mx-auto">
            <div></div>
            <div></div>
            <div></div>
          </div>
          <p className="mt-4 text-muted-foreground">Loading rebalance data...</p>
        </div>
      </div>
    );
  }
  
  if (success) {
    return (
      <div className="max-w-lg mx-auto mt-20 text-center animate-fade-in">
        <div className="bg-card rounded-xl border p-8 shadow-sm">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full mx-auto flex items-center justify-center text-green-600 dark:text-green-400 mb-4">
            <CheckCircle2 size={32} />
          </div>
          <h2 className="text-2xl font-bold mb-2">Rebalance Successful</h2>
          <p className="text-muted-foreground mb-6">
            Your portfolio has been successfully rebalanced according to the optimal allocation.
          </p>
          <div className="p-4 rounded-lg bg-secondary/50 mb-6 text-left">
            <h3 className="font-medium mb-2">Transaction Summary</h3>
            <p className="text-sm text-muted-foreground mb-1">From Ref Finance to Burrow: $124.50</p>
            <p className="text-sm text-muted-foreground">Gas used: $0.12</p>
          </div>
          <div className="space-y-3">
            <button 
              onClick={handleReset}
              className="w-full py-2 px-4 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              View Portfolio
            </button>
            <button 
              onClick={() => suggestQuestion("What other rebalancing strategies do you recommend?")}
              className="w-full py-2 px-4 rounded-lg border flex items-center justify-center gap-2 hover:bg-secondary transition-colors"
            >
              <MessageSquare size={16} />
              Discuss rebalancing strategies
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Rebalance Portfolio</h1>
          <p className="text-muted-foreground mt-1">Optimize your asset allocation for maximum yield</p>
        </div>
        
        <button 
          onClick={() => suggestQuestion("Explain portfolio rebalancing and its benefits")}
          className="flex items-center space-x-1 text-sm px-3 py-1.5 rounded-lg bg-secondary hover:bg-secondary/80 self-start sm:self-auto transition-colors"
        >
          <MessageSquare size={14} />
          <span>About Rebalancing</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-card border rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Current Allocation</h2>
          <AllocationChart data={currentAllocation} />
        </div>
        
        <div className="bg-card border rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Optimal Allocation</h2>
          {confirming ? (
            <AllocationChart data={optimalAllocation} />
          ) : (
            <div className="flex flex-col items-center justify-center h-[300px]">
              <button
                onClick={handleCalculate}
                disabled={calculating}
                className={`
                  py-2 px-4 rounded-lg flex items-center 
                  ${calculating 
                    ? 'bg-secondary text-muted-foreground cursor-not-allowed' 
                    : 'bg-primary text-primary-foreground hover:bg-primary/90'}
                  transition-colors
                `}
              >
                {calculating ? (
                  <>
                    <div className="loading-dots mr-2">
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                    Calculating...
                  </>
                ) : (
                  <>
                    <ArrowRightLeft size={16} className="mr-2" />
                    Calculate Optimal Allocation
                  </>
                )}
              </button>
              <p className="text-sm text-muted-foreground mt-4 text-center max-w-xs">
                AI will analyze current market conditions and suggest the best allocation for your risk profile.
              </p>
              
              <button 
                onClick={() => suggestQuestion("How does your AI calculate optimal allocation?")}
                className="flex items-center space-x-1 text-sm px-3 py-1.5 mt-4 text-primary hover:underline"
              >
                <MessageSquare size={14} />
                <span>How does this work?</span>
              </button>
            </div>
          )}
        </div>
      </div>
      
      {confirming && (
        <div className="animate-fade-in">
          <div className="bg-card border rounded-xl p-6 shadow-sm mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Rebalancing Plan</h2>
              <button 
                onClick={() => suggestQuestion("What are the risks of this rebalance?")}
                className="flex items-center space-x-1 text-sm text-primary"
              >
                <MessageSquare size={14} />
                <span>Assess risks</span>
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start p-4 rounded-lg bg-secondary/50">
                <Info size={20} className="text-primary mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Analysis Summary</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Based on current market conditions, we recommend increasing exposure to Burrow due to higher APY opportunities
                    in lending markets, while reducing allocation to Ref Finance.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start p-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/10 text-yellow-800 dark:text-yellow-400">
                <AlertTriangle size={20} className="mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Risk Considerations</h3>
                  <p className="text-sm mt-1 opacity-90">
                    Increasing allocation to Burrow comes with slightly higher smart contract risk. 
                    However, this aligns with your 'balanced' risk profile.
                  </p>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="font-medium mb-3">Rebalancing Transactions</h3>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-secondary/50">
                      <tr>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">From</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">To</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Amount</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Gas Estimate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((tx, index) => (
                        <tr key={index} className="border-t">
                          <td className="py-3 px-4">{tx.from}</td>
                          <td className="py-3 px-4">{tx.to}</td>
                          <td className="py-3 px-4 font-medium">{tx.amount}</td>
                          <td className="py-3 px-4 text-muted-foreground">{tx.gas}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:justify-end">
              <button 
                className="py-2 px-4 rounded-lg border hover:bg-secondary transition-colors"
                onClick={() => setConfirming(false)}
              >
                Cancel
              </button>
              <button 
                className={`
                  py-2 px-4 rounded-lg flex items-center justify-center min-w-[150px]
                  ${calculating 
                    ? 'bg-secondary text-muted-foreground cursor-not-allowed' 
                    : 'bg-primary text-primary-foreground hover:bg-primary/90'}
                  transition-colors
                `}
                onClick={handleConfirm}
                disabled={calculating}
              >
                {calculating ? (
                  <>
                    <div className="loading-dots mr-2">
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                    Processing...
                  </>
                ) : (
                  'Confirm Rebalance'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rebalance;
