import React, { createContext, useContext, useEffect, useState } from 'react';
import { setupWalletSelector } from '@near-wallet-selector/core';
import { setupModal } from '@near-wallet-selector/modal-ui';
import { setupMyNearWallet } from '@near-wallet-selector/my-near-wallet';
import { setupSender } from '@near-wallet-selector/sender';
import { setupMeteorWallet } from '@near-wallet-selector/meteor-wallet';
import { setupHereWallet } from '@near-wallet-selector/here-wallet';
// Import ledger only if you're using it
// import { setupLedger } from '@near-wallet-selector/ledger';
import type { 
  WalletSelector, 
  AccountState, 
  NetworkId,
  WalletModuleFactory
} from '@near-wallet-selector/core';

import { distinctUntilChanged, map } from 'rxjs';

// Define the context interface
interface NearWalletContextValue {
  selector: WalletSelector | null;
  modal: ReturnType<typeof setupModal> | null;
  accounts: Array<AccountState>;
  accountId: string | null;
}

// Create the context
const NearWalletContext = createContext<NearWalletContextValue>({
  selector: null,
  modal: null,
  accounts: [],
  accountId: null,
});

// Network configuration
const NETWORK: NetworkId = (process.env.REACT_APP_NEAR_NETWORK as NetworkId) || 'testnet';

export const NearWalletProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [selector, setSelector] = useState<WalletSelector | null>(null);
  const [modal, setModal] = useState<ReturnType<typeof setupModal> | null>(null);
  const [accounts, setAccounts] = useState<Array<AccountState>>([]);

  useEffect(() => {
    const init = async () => {
      try {
        // @ts-ignore
        const selector = await setupWalletSelector({
          network: NETWORK,
          debug: true,
          modules: [
            setupMyNearWallet(),
            setupSender() as unknown as WalletModuleFactory,
            setupMeteorWallet() as unknown as WalletModuleFactory,
            setupHereWallet(),
            // setupLedger(), // Only include if needed
          ],
        });

        // @ts-ignore
        const modal = setupModal(selector, {
          contractId: process.env.REACT_APP_CONTRACT_NAME || "",
        });
        
        const state = selector.store.getState();
        setAccounts(state.accounts);

        // Subscribe to account changes
        const subscription = selector.store.observable
          .pipe(
            map((state) => state.accounts),
            distinctUntilChanged()
          )
          .subscribe((nextAccounts) => {
            setAccounts(nextAccounts);
          });

        setSelector(selector);
        setModal(modal);

        return () => subscription.unsubscribe();
      } catch (err) {
        console.error("Error initializing wallet selector:", err);
      }
    };

    init();
  }, []);

  const accountId = accounts.length > 0 ? accounts[0].accountId : null;

  return (
    <NearWalletContext.Provider
      value={{
        selector,
        modal,
        accounts,
        accountId,
      }}
    >
      {children}
    </NearWalletContext.Provider>
  );
};

// Use this hook to access the NEAR wallet context
export const useNearWallet = () => useContext(NearWalletContext);