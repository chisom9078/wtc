import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import weblogo from "../../assets/websitelogo.png";
import BuyWTC from "../BuyWTC button/BuyWTC";
import { useState, useEffect } from "react";
import { useConnect } from "wagmi";
import { useSwitchNetwork, useAccount, useNetwork, useDisconnect } from "wagmi";
import { bsc } from "wagmi/chains";
import { ChainId } from "@pancakeswap/sdk";
import { wagmiConfig } from "../../wagmiConfig";
import ConnectButton from "../ConnectButton";
import "../../App.css";

// const chainId = ChainId.BSC;
const chainId = bsc;

// import { ethers } from 'ethers';
export default function Navbar() {
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { isConnected, address } = useAccount();
  const { switchNetwork } = useSwitchNetwork();
  const { chain } = useNetwork();

  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isPopupOpen1, setPopupOpen1] = useState(false);

  useEffect(() => {
    if (isConnected && chain?.id !== chainId) {
      switchNetwork?.(chainId);
    }
  }, [isConnected, switchNetwork, chain]);

  return (
    <Disclosure as="nav" className="bg-[#1E202D] fixed top-0 w-full z-30">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-10">
            <div className="relative flex h-16 md:h-20 items-center justify-between">
              <div className="flex-shrink-0">
                <img
                  className="h-11 md:h-[60px] w-auto"
                  src={weblogo}
                  alt="Your Company"
                />
              </div>
              <div className="flex items-center px-2 lg:px-0 shadow-2xl ">
                <div className="hidden lg:ml-6 lg:block">
                  <div className="flex space-x-4">
                    <a
                      href="#"
                      className="rounded-md px-3 py-2 text-sm md:text-lg font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      Introduce
                    </a>
                    <a
                      href="#Tokenomics"
                      className="rounded-md px-3 py-2 text-sm md:text-lg font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      Tokenomics
                    </a>
                    <a
                      href="#Why"
                      className="rounded-md px-3 py-2 text-sm md:text-lg font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      Why Winter Coin
                    </a>
                    <a
                      href="#app"
                      className="rounded-md px-3 py-2 text-sm md:text-lg font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      App
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex lg:hidden">
                {/* Mobile menu button */}

                <div className="  md:py-8 flex justify-between w-full">
                  <BuyWTC
                    isPopupOpen={isPopupOpen1}
                    setPopupOpen={setPopupOpen1}
                  />
                  <ConnectButton address={address} />
                </div>
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="hidden lg:ml-4 lg:block">
                <div className="flex items-center">
                  <BuyWTC
                    isPopupOpen={isPopupOpen}
                    setPopupOpen={setPopupOpen}
                  />
                  {/* <button className="ml-6 bg-red-400 flex-shrink-0 rounded-md mt-2 text-white-900 px-7 py-3 font-bold" onClick={handleConnectWallet}>{account ? `Connected: ${account}` : 'Connect Wallet'}</button>
                  <p>{network && `Current Network: ${network}`}</p> */}
                  <ConnectButton address={address} />
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="lg:hidden">
            <div className="space-y-2 px-2 pb-3 pt-2">
              <Disclosure.Button
                as="a"
                href="#"
                className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
              >
                Introduce
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#Tokenomics"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Tokenomics
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#Why"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Why Winter Coin
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#app"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                App
              </Disclosure.Button>
              {/* <div className="lg:py-8 py flex justify-between w-full">
                <BuyWTC
                  isPopupOpen={isPopupOpen1}
                  setPopupOpen={setPopupOpen1}
                />
                <button
                  onClick={async () => {
                    if (isConnected) {
                      disconnect(wagmiConfig);
                    } else {
                      connect({ connector: connectors[0] });
                    }
                  }}
                  className="bg-red-400 flex-shrink-0 rounded-md mt-2 text-white-900 px-7 py-3 font-bold"
                >
                  {address
                    ? `${address?.substring(0, 4)} .... ${address.substring(
                        address.length - 1,
                        address.length - 5,
                      )}`
                    : 'Connect Wallet'}
                </button>
              </div> */}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
