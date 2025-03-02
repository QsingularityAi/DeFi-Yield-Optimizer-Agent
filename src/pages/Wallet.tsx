
import React, { useState, useEffect } from 'react';
import { Copy, ExternalLink, ArrowUp, ArrowDown, RefreshCw } from 'lucide-react';
import { useNearWallet } from '@/context/NearWalletContext';

const Wallet = () => {
  const { accountId, isConnected, connectWallet, disconnectWallet, loading: walletLoading } = useNearWallet();
  const [loading, setLoading] = useState(true);
  const [copySuccess, setCopySuccess] = useState(false);
  
  // Mock wallet data
  const walletData = {
    address: accountId || 'Not connected',
    balance: isConnected ? '1,245.32 NEAR' : '0 NEAR',
    value: isConnected ? '$2,490.64 USD' : '$0.00 USD',
    lastUpdated: new Date().toLocaleString()
  };
  
  const assets = [
    { name: 'NEAR', balance: '1,245.32', value: '$2,490.64', icon: '₦' },
    { name: 'USDC', balance: '500.00', value: '$500.00', icon: '$' },
    { name: 'wETH', balance: '0.25', value: '$500.00', icon: 'Ξ' },
  ];
  
  useEffect(() => {
    // Simulate API loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  
  if (loading || walletLoading) {
    return (
      <div className="flex items-center justify-center h-[80vh] animate-fade-in">
        <div className="text-center">
          <div className="loading-dots mx-auto">
            <div></div>
            <div></div>
            <div></div>
          </div>
          <p className="mt-4 text-muted-foreground">Loading your wallet...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Wallet</h1>
        <p className="text-muted-foreground mt-1">Manage your NEAR wallet and assets</p>
      </div>
      
      <div className="bg-card border rounded-xl p-6 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Connected Account</p>
            <div className="flex items-center mt-1">
              <h2 className="text-xl font-semibold">{walletData.address}</h2>
              {isConnected && (
                <button 
                  onClick={() => copyToClipboard(walletData.address)}
                  className="ml-2 p-1 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Copy address"
                >
                  <Copy size={16} />
                </button>
              )}
              {copySuccess && (
                <span className="ml-2 text-xs text-green-500 animate-fade-in">Copied!</span>
              )}
            </div>
            {isConnected && (
              <a 
                href={`https://explorer.testnet.near.org/accounts/${walletData.address}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary flex items-center mt-1 hover:underline"
              >
                View on Explorer <ExternalLink size={12} className="ml-1" />
              </a>
            )}
          </div>
          
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Total Balance</p>
            <h2 className="text-2xl font-bold mt-1">{walletData.balance}</h2>
            <p className="text-sm text-muted-foreground">{walletData.value}</p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3 mt-6">
          {isConnected ? (
            <>
              <button className="py-2 px-4 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center">
                <ArrowUp size={16} className="mr-2" />
                Send
              </button>
              <button className="py-2 px-4 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center">
                <ArrowDown size={16} className="mr-2" />
                Receive
              </button>
              <button 
                className="py-2 px-4 rounded-lg border hover:bg-secondary transition-colors flex items-center"
                onClick={handleRefresh}
              >
                <RefreshCw size={16} className="mr-2" />
                Refresh
              </button>
              <button 
                className="py-2 px-4 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
                onClick={disconnectWallet}
              >
                Disconnect
              </button>
            </>
          ) : (
            <button 
              className="py-2 px-4 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              onClick={connectWallet}
            >
              Connect Wallet
            </button>
          )}
        </div>
        
        {isConnected && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Your Assets</h3>
              <p className="text-xs text-muted-foreground">Last updated: {walletData.lastUpdated}</p>
            </div>
            
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-secondary/50">
                  <tr>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Asset</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Balance</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {assets.map((asset, index) => (
                    <tr key={index} className="border-t">
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold mr-3">
                            {asset.icon}
                          </span>
                          <span>{asset.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right font-medium">{asset.balance}</td>
                      <td className="py-4 px-4 text-right text-muted-foreground">{asset.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wallet;
