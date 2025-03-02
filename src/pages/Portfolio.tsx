
import React, { useState, useEffect } from 'react';
import { PlusCircle, Clock, ArrowLeft, ArrowRight } from 'lucide-react';
import AllocationChart from '@/components/ui/AllocationChart';
import MarketChart from '@/components/ui/MarketChart';
import ProtocolCard from '@/components/ui/ProtocolCard';

const Portfolio = () => {
  const [loading, setLoading] = useState(true);
  
  // Mock data
  const allocationData = [
    { name: 'Ref Finance', value: 40, color: '#4f46e5' },
    { name: 'Burrow', value: 35, color: '#16a34a' },
    { name: 'Meta Pool', value: 25, color: '#8b5cf6' }
  ];
  
  const performanceData = Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    value: 10000 + (i * 100) + (Math.random() * 200 - 100)
  }));
  
  const mockProtocols = [
    { name: 'Ref Finance', apy: 7.2, tvl: '$32.5M', risk: 'Medium' as const, allocation: 40 },
    { name: 'Burrow', apy: 10.5, tvl: '$18.9M', risk: 'High' as const, allocation: 35 },
    { name: 'Meta Pool', apy: 4.8, tvl: '$45.2M', risk: 'Low' as const, allocation: 25 }
  ];
  
  const transactions = [
    { type: 'Deposit', protocol: 'Ref Finance', amount: '200 NEAR', date: '2023-05-15', status: 'Completed' },
    { type: 'Rebalance', protocol: 'Burrow', amount: '50 NEAR', date: '2023-05-10', status: 'Completed' },
    { type: 'Withdraw', protocol: 'Meta Pool', amount: '100 NEAR', date: '2023-05-05', status: 'Completed' },
    { type: 'Claim Rewards', protocol: 'Ref Finance', amount: '25 NEAR', date: '2023-05-01', status: 'Completed' }
  ];
  
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
          <p className="mt-4 text-muted-foreground">Loading your portfolio...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Portfolio</h1>
        <p className="text-muted-foreground mt-1">Your current investments and performance</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card border rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Portfolio Performance</h2>
            <MarketChart data={performanceData} />
            
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="p-4 rounded-lg border bg-background text-center">
                <p className="text-sm text-muted-foreground">Total Value</p>
                <p className="text-xl font-semibold mt-1">$12,450.32</p>
              </div>
              <div className="p-4 rounded-lg border bg-background text-center">
                <p className="text-sm text-muted-foreground">Total Yield</p>
                <p className="text-xl font-semibold mt-1">$345.21</p>
              </div>
              <div className="p-4 rounded-lg border bg-background text-center">
                <p className="text-sm text-muted-foreground">Avg. APY</p>
                <p className="text-xl font-semibold mt-1">8.2%</p>
              </div>
            </div>
          </div>
          
          <div className="bg-card border rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Recent Transactions</h2>
              <button className="flex items-center text-sm text-primary">
                <Clock size={14} className="mr-1" /> 
                Transaction History
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Type</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Protocol</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Amount</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Date</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx, index) => (
                    <tr key={index} className="border-b last:border-b-0">
                      <td className="py-3 px-2">{tx.type}</td>
                      <td className="py-3 px-2">{tx.protocol}</td>
                      <td className="py-3 px-2">{tx.amount}</td>
                      <td className="py-3 px-2">{new Date(tx.date).toLocaleDateString()}</td>
                      <td className="py-3 px-2">
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="flex justify-between items-center mt-4">
              <button className="p-2 rounded text-muted-foreground hover:bg-secondary transition-colors">
                <ArrowLeft size={16} />
              </button>
              <span className="text-sm text-muted-foreground">Page 1 of 1</span>
              <button className="p-2 rounded text-muted-foreground hover:bg-secondary transition-colors">
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-card border rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Current Allocation</h2>
            <AllocationChart data={allocationData} />
            
            <div className="mt-4">
              <button className="w-full flex items-center justify-center py-2 px-4 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                <PlusCircle size={16} className="mr-2" />
                Deposit Funds
              </button>
            </div>
          </div>
          
          <div className="bg-card border rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Active Protocols</h2>
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

export default Portfolio;
