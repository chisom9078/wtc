import {
  Native,
  ChainId,
  CurrencyAmount,
  TradeType,
  Percent,
  ERC20Token,
} from "@pancakeswap/sdk";
import {
  SmartRouter,
  SMART_ROUTER_ADDRESSES,
  SwapRouter,
} from "@pancakeswap/smart-router/evm";
import { useCallback, useMemo, useState } from "react";
import {
  createConfig,
  useAccount,
  useConnect,
  useSwitchNetwork,
  useNetwork,
  useSendTransaction,
} from "wagmi";
import { bsc } from "wagmi/chains";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { createPublicClient, hexToBigInt, http } from "viem";
import { GraphQLClient } from "graphql-request";
import { Disclosure } from "@headlessui/react";

const chainId = ChainId.BSC;
const wtc = new ERC20Token(
  ChainId.BSC,
  "0xA09d8624EAE87e8b5F87B23fE694eea2D02Dde2e",
  18,
  "WTC",
  "Winter Coin",
  "https://sushi.com/"
);
const swapFrom = Native.onChain(chainId);
const swapTo = wtc;

const publicClient = createPublicClient({
  chain: bsc,
  transport: http("https://bsc-dataseed1.binance.org"),
  batch: {
    multicall: {
      batchSize: 1024 * 200,
    },
  },
});

const config = createConfig({
  autoConnect: true,
  connectors: [new MetaMaskConnector({ chains: [bsc] })],
  publicClient,
});

const v3SubgraphClient = new GraphQLClient(
  "https://api.thegraph.com/subgraphs/name/pancakeswap/exchange-v3-bsc"
);
const v2SubgraphClient = new GraphQLClient(
  "https://proxy-worker-api.pancakeswap.com/bsc-exchange"
);

const quoteProvider = SmartRouter.createQuoteProvider({
  onChainProvider: () => publicClient,
});

function calculateGasMargin(value, margin = 1000n) {
  return (value * (10000n + margin)) / 10000n;
}

// eslint-disable-next-line react/prop-types
const BuyWTC = ({ isPopupOpen, setPopupOpen }) => {
  const { chain } = useNetwork();
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { switchNetwork } = useSwitchNetwork();
  const { sendTransactionAsync } = useSendTransaction();

  const [amount, setAmount] = useState(() => {
    return CurrencyAmount.fromRawAmount(swapFrom, 0.8 * 10 ** 18);
  });
  const [trade, setTrade] = useState(null);

  const getBestRoute = async (amount) => {
    const [v2Pools, v3Pools] = await Promise.all([
      SmartRouter.getV2CandidatePools({
        onChainProvider: () => publicClient,
        v2SubgraphProvider: () => v2SubgraphClient,
        v3SubgraphProvider: () => v3SubgraphClient,
        currencyA: amount.currency,
        currencyB: swapTo,
      }),
      SmartRouter.getV3CandidatePools({
        onChainProvider: () => publicClient,
        subgraphProvider: () => v3SubgraphClient,
        currencyA: amount.currency,
        currencyB: swapTo,
      }),
    ]);
    const pools = [...v2Pools, ...v3Pools];
    console.log("amount", amount);
    const trade = await SmartRouter.getBestTrade(
      amount,
      swapTo,
      TradeType.EXACT_INPUT,
      {
        gasPriceWei: () => publicClient.getGasPrice(),
        maxHops: 2,
        maxSplits: 2,
        poolProvider: SmartRouter.createStaticPoolProvider(pools),
        quoteProvider,
        quoterOptimization: true,
      }
    );
    setTrade(trade);
  };

  const swapCallParams = useMemo(() => {
    if (!trade) {
      return null;
    }
    const { value, calldata } = SwapRouter.swapCallParameters(trade, {
      recipient: address,
      slippageTolerance: new Percent(1),
    });
    return {
      address: SMART_ROUTER_ADDRESSES[chainId],
      calldata,
      value,
    };
  }, [trade, address]);

  const swap = useCallback(async () => {
    if (!swapCallParams || !address) {
      return;
    }

    const { value, calldata, address: routerAddress } = swapCallParams;

    const tx = {
      account: address,
      to: routerAddress,
      data: calldata,
      value: hexToBigInt(value),
    };
    const gasEstimate = await publicClient.estimateGas(tx);
    const result = await sendTransactionAsync({
      account: address,
      chainId,
      to: routerAddress,
      data: calldata,
      value: hexToBigInt(value),
      gas: calculateGasMargin(gasEstimate),
    });
  }, [swapCallParams, address, sendTransactionAsync]);

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  return (
    <>
      <Disclosure>
        <Disclosure.Button
          as="a"
          href="#"
          onClick={() => {
            if (!isConnected) {
              alert("Please connect wallet");
              return;
            }
            openPopup();
          }}
          className="relative flex-shrink-0 rounded-md mt-2 bg-yellow-400 text-black hover:text-white  px-3 py-2 md:px-7 md:py-3 font-bold"
          style={{ boxShadow: "0px 1px 10px 0px #c6b270b8" }}
        >
          BUY WTC
        </Disclosure.Button>
      </Disclosure>

      {isPopupOpen && (
        <div
          className=" h-[100vh] w-[100vw] bg-[#060606cb]"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(6, 6, 6, 0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 99,
            overflowX: "hidden",
          }}
        >
          <div
            className="bg-[#1E202D]  lg:h-[80vh] z-30 py-6 px-6  border border-yellow-300  rounded-md w-[380px]  md:min-w-[500px]"
            style={{ zIndex: 999 }}
          >
            <div className="flex justify-end items-center">
              <button
                type="button"
                onClick={closePopup}
                className="md:px-2 rounded-md text-lg px-3  py-1 bg-yellow-400  font-bold text-black shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                &times;
              </button>
            </div>
            <div className=" w-full md:max-w-[500px] ">
              <div className="p-5 flex justify-center items-center flex-col">
                <h3 className="text-gray-300 text-3xl font-bold pb-3">Swap</h3>

                <p className="text-gray-300 text-lg">
                  Trade Token in an instant
                </p>
                <hr />
              </div>

              <div className="bg-[#182732] md:m-3 md:p-3 p-2 rounded-lg">
                <div className="pb-4  ">
                  <div className="flex justify-between p ">
                    <p className="text-gray-300 text-base md:lg">
                      {amount.currency.symbol}
                    </p>

                    <p className="text-gray-300 text-base md:lg">
                      {amount.toExact()}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="w-[130px] md:w-auto">
                    <input
                      type="number"
                      className="bg-transparent border-none rounded-md  text-gray-300"
                      placeholder="0.0000"
                      onChange={async (e) => {
                        setAmount(
                          CurrencyAmount.fromRawAmount(
                            swapFrom,
                            +e.target.value * 10 ** 18
                          )
                        );
                        await getBestRoute(
                          CurrencyAmount.fromRawAmount(
                            swapFrom,
                            +e.target.value * 10 ** 18
                          )
                        );
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-center items-center py-5">
                <button className="rounded-full border p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="12"
                    width="12"
                    viewBox="0 0 384 512"
                  >
                    <path
                      d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
                      fill="#FFF"
                    />
                  </svg>
                </button>
              </div>

              <div className="bg-[#182732] md:m-3 md:p-3 p-2 rounded-lg">
                <div className="pb-4  ">
                  <div className="flex justify-between p ">
                    <p className="text-gray-300 text-base md:lg">
                      {swapTo.symbol}
                    </p>
                    <p className="text-gray-300 text-base md:lg">
                      {trade?.outputAmount.toExact() || "?"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center items-center py-5">
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await swap();
                    } catch (error) {
                      console.log("error", JSON.stringify(error));
                      alert(error["cause"]["details"]);
                    }
                  }}
                  className="md:px-11 px-9 rounded-md bg-yellow-400  py-3 text-sm font-bold text-black shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  SWAP
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BuyWTC;
