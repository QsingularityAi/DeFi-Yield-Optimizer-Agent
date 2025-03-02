
import React, { useState, useEffect } from 'react';
import { Wallet } from 'lucide-react';
import { useNearWallet } from '@/context/NearWalletContext';
import { utils } from 'near-api-js';
import { toast } from 'sonner';

const WalletConnection = () => {
  const { accountId, isConnected, connectWallet, disconnectWallet } = useNearWallet();
  const [balance, setBalance] = useState<string>('');

  useEffect(() => {
    if (isConnected && accountId) {
      // Fetch balance using RPC directly (simplified version)
      fetch('https://rpc.testnet.near.org', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 'dontcare',
          method: 'query',
          params: {
            request_type: 'view_account',
            finality: 'final',
            account_id: accountId,
          },
        }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.result && data.result.amount) {
            const nearBalance = utils.format.formatNearAmount(data.result.amount, 4);
            setBalance(nearBalance);
          }
        })
        .catch(error => {
          console.error('Error fetching balance:', error);
        });
    }
  }, [accountId, isConnected]);

  const handleConnectClick = () => {
    if (isConnected) {
      disconnectWallet();
    } else {
      connectWallet();
    }
  };

  return (
    <div className="flex items-center gap-3">
      {isConnected && accountId ? (
        <div className="flex items-center space-x-2">
          <div className="text-sm font-medium">
            <span className="text-muted-foreground">
              {accountId.length > 12 ? `${accountId.slice(0, 6)}...${accountId.slice(-6)}` : accountId}
            </span>
            {balance && (
              <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                {balance} NEAR
              </span>
            )}
          </div>
          <button
            onClick={handleConnectClick}
            className="text-xs px-2 py-1 border border-destructive/50 text-destructive rounded hover:bg-destructive/10 transition-colors"
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button
          onClick={handleConnectClick}
          className="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm"
        >
          <Wallet size={16} />
          <span>Connect Wallet</span>
        </button>
      )}
    </div>
  );
};

export default WalletConnection;
