// import { MetaMaskConnector } from "wagmi/connectors/metaMask";
// import { createConfig } from "wagmi";
// import { createPublicClient, http } from "viem";
import "./App.css";

import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import { walletConnectProvider, EIP6963Connector } from "@web3modal/wagmi";
import { configureChains } from "wagmi";
import { bsc } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

// Get projectId at https://cloud.walletconnect.com
const projectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID;

const metadata = {
  name: "Web3Modal",
  description: "Web3Modal Example",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

// const chains = [bsc];

// export const publicClient = createPublicClient({
//   chain: bsc,
//   transport: http("https://bsc-dataseed1.binance.org"),
//   batch: {
//     multicall: {
//       batchSize: 1024 * 200,
//     },
//   },
// });

const { chains, publicClient } = configureChains(
  [bsc],
  [walletConnectProvider({ projectId }), publicProvider()]
);

export const wagmiConfig = defaultWagmiConfig({
  autoConnect: true,
  // connectors: [new MetaMaskConnector({ chains: [bsc] })],
  connectors: [
    new WalletConnectConnector({
      chains,
      options: { projectId, showQrModal: false, metadata },
    }),
    new EIP6963Connector({ chains }),
    new InjectedConnector({ chains, options: { shimDisconnect: true } }),
    new CoinbaseWalletConnector({
      chains,
      options: { appName: metadata.name },
    }),
  ],
  chains,
  projectId,
  metadata,
  publicClient,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
});

createWeb3Modal({
  wagmiConfig,
  projectId,
  chains,
  allWallets: "ONLY_MOBILE",
  includeWalletIds: [
    "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96",
    "4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0",
    "fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa",
  ],
  themeMode: "dark",
  // themeVariables: {
  //   "--w3m-color-mix": "#1E202D",
  //   "--w3m-color-mix-strength": 100,
  //   "--w3m-accent": "#1E202D",
  //   "--w3m-border-radius-master": "6px",
  //   "--w3m-font-size-master": "12px",
  // },
});
