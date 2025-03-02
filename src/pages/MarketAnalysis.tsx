
import React, { useState, useEffect } from 'react';
import { ArrowRight, TrendingUp, TrendingDown, AlertTriangle, BarChart3, RefreshCw, Filter, ChevronDown, Info } from 'lucide-react';
import { toast } from 'sonner';
import MarketChart from '@/components/ui/MarketChart';
import ProtocolCard from '@/components/ui/ProtocolCard';

const MarketAnalysis = () => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [timeframe, setTimeframe] = useState('30d');
  const [chartType, setChartType] = useState('apy');
  const [filteredProtocols, setFilteredProtocols] = useState<any[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    minApy: 0,
    maxRisk: 'All',
    category: 'All'
  });
  
  // Mock market data
  const yieldTrends = Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    value: 5 + Math.random() * 5
  }));
  
  const tvlTrends = Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    value: 100000000 + (i * 2000000) + (Math.random() * 5000000)
  }));
  
  const volumeTrends = Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    value: 25000000 + (i * 500000) + (Math.random() * 2000000)
  }));
  
  const mockProtocols = [
    { 
      name: 'Ref Finance', 
      apy: 7.2, 
      tvl: '$32.5M', 
      risk: 'Medium' as const, 
      dailyChange: 0.3,
      weeklyChange: 1.2,
      category: 'DEX',
      volume: '$4.2M',
      userCount: '12.5K',
      description: 'Automated market maker and liquidity provider on NEAR Protocol.'
    },
    { 
      name: 'Burrow', 
      apy: 10.5, 
      tvl: '$18.9M', 
      risk: 'High' as const,
      dailyChange: -0.5,
      weeklyChange: 2.3,
      category: 'Lending',
      volume: '$2.1M',
      userCount: '8.2K',
      description: 'Borrowing and lending protocol built on NEAR Protocol.' 
    },
    { 
      name: 'Meta Pool', 
      apy: 4.8, 
      tvl: '$45.2M', 
      risk: 'Low' as const,
      dailyChange: 0.1,
      weeklyChange: 0.5,
      category: 'Staking',
      volume: '$950K',
      userCount: '22.7K',
      description: 'Liquid staking solution for NEAR token holders.'
    },
    { 
      name: 'Jumbo Exchange', 
      apy: 8.3, 
      tvl: '$15.1M', 
      risk: 'Medium' as const,
      dailyChange: 0.7,
      weeklyChange: -0.8,
      category: 'DEX',
      volume: '$3.7M',
      userCount: '7.8K',
      description: 'Decentralized exchange with multiple pool types and farming.'
    },
    { 
      name: 'Aurigami', 
      apy: 11.7, 
      tvl: '$9.8M', 
      risk: 'High' as const,
      dailyChange: 1.2,
      weeklyChange: 3.5,
      category: 'Lending',
      volume: '$1.9M',
      userCount: '5.3K',
      description: 'Money market protocol with innovative yield strategies.'
    },
    { 
      name: 'Tonic', 
      apy: 6.5, 
      tvl: '$22.3M', 
      risk: 'Medium' as const,
      dailyChange: -0.3,
      weeklyChange: 1.4,
      category: 'Perpetuals',
      volume: '$6.8M',
      userCount: '9.1K',
      description: 'Decentralized perpetual exchange with up to 10x leverage.'
    }
  ];
  
  const marketInsights = [
    {
      title: 'Rising Yield Opportunities',
      description: 'Lending protocols showing increased APYs over the past week due to increased borrowing demand.',
      type: 'positive',
      icon: TrendingUp
    },
    {
      title: 'TVL Decline in Some DEXs',
      description: 'Several decentralized exchanges experienced reduced liquidity over the past 72 hours.',
      type: 'negative',
      icon: TrendingDown
    },
    {
      title: 'New Protocol Risks',
      description: 'Recent audit of Burrow protocol revealed minor vulnerabilities that are being addressed.',
      type: 'warning',
      icon: AlertTriangle
    }
  ];
  
  const marketIndicators = [
    { name: 'NEAR Price', value: '$2.34', change: '+3.2%', positive: true },
    { name: 'Total NEAR DeFi TVL', value: '$168.3M', change: '-1.5%', positive: false },
    { name: 'Avg Market APY', value: '7.8%', change: '+0.3%', positive: true },
    { name: 'Weekly Volume', value: '$42.6M', change: '+5.4%', positive: true }
  ];
  
  const getActiveChartData = () => {
    switch (chartType) {
      case 'apy':
        return { data: yieldTrends, title: 'Average Protocol APY', color: '#16a34a' };
      case 'tvl':
        return { data: tvlTrends, title: 'Total Value Locked', color: '#8b5cf6' };
      case 'volume':
        return { data: volumeTrends, title: 'Trading Volume', color: '#ef4444' };
      default:
        return { data: yieldTrends, title: 'Average Protocol APY', color: '#16a34a' };
    }
  };
  
  useEffect(() => {
    // Filter protocols based on selected filters
    const filtered = mockProtocols.filter(protocol => {
      const passesApyFilter = protocol.apy >= filters.minApy;
      const passesRiskFilter = filters.maxRisk === 'All' || protocol.risk === filters.maxRisk;
      const passesCategoryFilter = filters.category === 'All' || protocol.category === filters.category;
      
      return passesApyFilter && passesRiskFilter && passesCategoryFilter;
    });
    
    setFilteredProtocols(filtered);
  }, [filters]);
  
  useEffect(() => {
    // Simulate API loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleRefresh = () => {
    setRefreshing(true);
    
    // Simulate data refresh
    setTimeout(() => {
      setRefreshing(false);
      toast.success('Market data refreshed successfully');
    }, 2000);
  };
  
  const handleTimeframeChange = (newTimeframe: string) => {
    setTimeframe(newTimeframe);
    // In a real implementation, this would fetch new data for the selected timeframe
  };
  
  const handleChartTypeChange = (newType: string) => {
    setChartType(newType);
  };
  
  const handleFilterChange = (filterKey: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [filterKey]: value
    }));
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
          <p className="mt-4 text-muted-foreground">Analyzing market data...</p>
        </div>
      </div>
    );
  }
  
  const activeChart = getActiveChartData();
  
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Market Analysis</h1>
          <p className="text-muted-foreground mt-1">Current market conditions and protocol insights</p>
        </div>
        
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className={`flex items-center space-x-2 py-2 px-3 rounded-lg 
            ${refreshing ? 'bg-secondary text-muted-foreground' : 'bg-secondary hover:bg-secondary/80'} 
            transition-colors`}
        >
          <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} />
          <span>{refreshing ? 'Refreshing...' : 'Refresh Data'}</span>
        </button>
      </div>
      
      {/* Market Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {marketIndicators.map((indicator, index) => (
          <div key={index} className="p-4 rounded-xl bg-card border shadow-sm hover-lift">
            <p className="text-sm font-medium text-muted-foreground">{indicator.name}</p>
            <h3 className="text-2xl font-bold mt-1">{indicator.value}</h3>
            <p className={`text-xs mt-1 flex items-center ${indicator.positive ? 'text-green-500' : 'text-red-500'}`}>
              <span className="mr-1">{indicator.positive ? '↑' : '↓'}</span>
              {indicator.change}
            </p>
          </div>
        ))}
      </div>
      
      {/* Chart Controls */}
      <div className="bg-card border rounded-xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between mb-4">
          <div className="flex items-center space-x-1 mb-4 sm:mb-0">
            <h2 className="text-xl font-semibold mr-2">Market Trends</h2>
            <button
              className={`px-3 py-1 text-sm rounded-lg ${chartType === 'apy' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}
              onClick={() => handleChartTypeChange('apy')}
            >
              APY
            </button>
            <button
              className={`px-3 py-1 text-sm rounded-lg ${chartType === 'tvl' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}
              onClick={() => handleChartTypeChange('tvl')}
            >
              TVL
            </button>
            <button
              className={`px-3 py-1 text-sm rounded-lg ${chartType === 'volume' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}
              onClick={() => handleChartTypeChange('volume')}
            >
              Volume
            </button>
          </div>
          
          <div className="flex items-center space-x-1">
            <p className="text-sm text-muted-foreground mr-2">Timeframe:</p>
            <button
              className={`px-3 py-1 text-sm rounded-lg ${timeframe === '7d' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}
              onClick={() => handleTimeframeChange('7d')}
            >
              7D
            </button>
            <button
              className={`px-3 py-1 text-sm rounded-lg ${timeframe === '30d' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}
              onClick={() => handleTimeframeChange('30d')}
            >
              30D
            </button>
            <button
              className={`px-3 py-1 text-sm rounded-lg ${timeframe === '90d' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}
              onClick={() => handleTimeframeChange('90d')}
            >
              90D
            </button>
          </div>
        </div>
        
        <MarketChart 
          data={activeChart.data} 
          title={activeChart.title} 
          color={activeChart.color}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card border rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Market Insights</h2>
            <div className="space-y-4">
              {marketInsights.map((insight, index) => (
                <div 
                  key={index}
                  className="flex p-4 rounded-lg border bg-background"
                >
                  <div className={`
                    p-2 rounded-full h-fit mr-4
                    ${insight.type === 'positive' ? 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400' : ''}
                    ${insight.type === 'negative' ? 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400' : ''}
                    ${insight.type === 'warning' ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400' : ''}
                  `}>
                    <insight.icon size={18} />
                  </div>
                  <div>
                    <h3 className="font-medium">{insight.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{insight.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 border rounded-lg bg-secondary/30">
              <div className="flex items-start">
                <Info size={18} className="text-primary mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">AI Market Analysis</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Based on current market indicators, lending protocols are showing particularly strong 
                    yield opportunities. Consider increasing allocation to Burrow if it aligns with your 
                    risk profile. Overall market sentiment remains bullish with stable TVL growth.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-card border rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Protocols</h2>
              <button 
                className="text-sm flex items-center space-x-1 text-primary"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter size={14} />
                <span>Filters</span>
                <ChevronDown size={14} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
            </div>
            
            {showFilters && (
              <div className="mb-6 p-4 border rounded-lg bg-secondary/30 animate-fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Minimum APY</label>
                    <div className="flex items-center">
                      <input 
                        type="range"
                        min="0"
                        max="15"
                        step="0.5"
                        value={filters.minApy}
                        onChange={(e) => handleFilterChange('minApy', parseFloat(e.target.value))}
                        className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="ml-2 text-sm font-medium">{filters.minApy}%</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Max Risk Level</label>
                    <select 
                      value={filters.maxRisk}
                      onChange={(e) => handleFilterChange('maxRisk', e.target.value)}
                      className="w-full p-2 border rounded-lg bg-background"
                    >
                      <option value="All">All Risks</option>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <select 
                      value={filters.category}
                      onChange={(e) => handleFilterChange('category', e.target.value)}
                      className="w-full p-2 border rounded-lg bg-background"
                    >
                      <option value="All">All Categories</option>
                      <option value="DEX">DEX</option>
                      <option value="Lending">Lending</option>
                      <option value="Staking">Staking</option>
                      <option value="Perpetuals">Perpetuals</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredProtocols.slice(0, 4).map((protocol) => (
                <ProtocolCard key={protocol.name} {...protocol} />
              ))}
            </div>
            
            <button className="w-full mt-4 py-2 text-sm text-center text-primary flex items-center justify-center">
              See all protocols <ArrowRight size={14} className="ml-1" />
            </button>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-card border rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Top APY Protocols</h2>
            <div className="space-y-3">
              {[...mockProtocols].sort((a, b) => b.apy - a.apy).slice(0, 3).map((protocol) => (
                <ProtocolCard key={protocol.name} {...protocol} />
              ))}
            </div>
          </div>
          
          <div className="bg-card border rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Protocol Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 font-medium text-muted-foreground">Protocol</th>
                    <th className="text-right py-2 font-medium text-muted-foreground">APY</th>
                    <th className="text-right py-2 font-medium text-muted-foreground">Daily</th>
                    <th className="text-right py-2 font-medium text-muted-foreground">Weekly</th>
                  </tr>
                </thead>
                <tbody>
                  {mockProtocols.slice(0, 5).map((protocol, index) => (
                    <tr key={index} className="border-b last:border-0">
                      <td className="py-2">{protocol.name}</td>
                      <td className="py-2 text-right font-medium">{protocol.apy.toFixed(1)}%</td>
                      <td className={`py-2 text-right ${protocol.dailyChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {protocol.dailyChange >= 0 ? '+' : ''}{protocol.dailyChange.toFixed(1)}%
                      </td>
                      <td className={`py-2 text-right ${protocol.weeklyChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {protocol.weeklyChange >= 0 ? '+' : ''}{protocol.weeklyChange.toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="bg-card border rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Market Sentiment</h2>
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full border-8 border-green-500 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold">Bullish</span>
              </div>
              <p className="text-sm text-muted-foreground text-center">
                Market sentiment is currently bullish with increasing yield opportunities across NEAR DeFi protocols.
              </p>
              <div className="mt-4 w-full bg-secondary/50 rounded-lg p-3">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Bearish</span>
                  <span>Neutral</span>
                  <span>Bullish</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div 
                    className="bg-green-500 rounded-full h-2" 
                    style={{ width: '75%' }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketAnalysis;
