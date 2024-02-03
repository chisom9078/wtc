import { useState, useEffect } from 'react';

const App = () => {
  const [account, setAccount] = useState('');
  const [network, setNetwork] = useState('');

  useEffect(() => {
    const checkMetamask = async () => {
      if (window.ethereum) {
        try {
          // Request account access
          await window.ethereum.request({ method: 'eth_requestAccounts' });

          // Get the selected account
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          setAccount(accounts[0]);

          // Get the network ID
          const networkId = await window.ethereum.request({ method: 'net_version' });

          // Check if the network is Ethereum (1) and switch to BSC (56)
          if (networkId !== '56') {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: '0x38', // BSC mainnet
                  chainName: 'Binance Smart Chain Mainnet',
                  nativeCurrency: {
                    name: 'BNB',
                    symbol: 'bnb',
                    decimals: 18,
                  },
                  rpcUrls: ['https://bsc-dataseed.binance.org/'],
                  blockExplorerUrls: ['https://bscscan.com/'],
                },
              ],
            });
            setNetwork('BSC');
          } else {
            setNetwork('Ethereum');
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        console.error('Metamask not detected');
      }
    };

    checkMetamask();
  }, []);

  const handleConnectWallet = async () => {
    if (window.ethereum) {
      try {
        // Request account access
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        // Get the selected account
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        setAccount(accounts[0]);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error('Metamask not detected');
    }
  };

  return (
    <div>
      <button onClick={handleConnectWallet}>
        {account ? `Connected: ${account}` : 'Connect Wallet'}
      </button>
      <p>{network && `Current Network: ${network}`}</p>
    </div>
  );
};

export default App;
