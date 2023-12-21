import React, { useCallback, useState } from 'react';
import Onboard, { WalletState } from '@web3-onboard/core';
import injectedModule from '@web3-onboard/injected-wallets';

import SendTransaction from './SendTransaction';

const injected = injectedModule();

const onboard = Onboard({
  wallets: [injected],
  chains: [
    {
      id: '123456',
      token: 'ETH',
      label: 'Local Ganache',
      rpcUrl: 'http://localhost:8545',
    },
  ],
});

const Navigation: React.FC = () => {
  const [wallet, setWallet] = useState<WalletState>();

  const handleConnect = useCallback(async () => {
    const wallets = await onboard.connectWallet();

    const [metamaskWallet] = wallets;

    if (metamaskWallet.label === 'MetaMask' && metamaskWallet.accounts[0].address) {
      setWallet(metamaskWallet);
    }
  }, []);

  return (
    <header className="z-50 w-full py-4 bg-gray-800">
      <nav className="max-w-[85rem] mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <a href="." className="text-xl font-semibold text-white mb-4 sm:mb-0">
            Transactions List
          </a>
          <div>
            {wallet && (
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <SendTransaction />
                <p className="py-3 px-4 rounded-md border-2 border-gray-200 font-semibold text-gray-200 text-sm truncate">
                  {wallet.accounts[0].address}
                </p>
              </div>
            )}
            {!wallet && (
              <button
                type="button"
                onClick={handleConnect}
                className="py-3 px-4 rounded-md border-2 border-gray-200 font-semibold text-gray-200 hover:text-white hover:bg-gray-500 hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2 transition-all text-sm"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
