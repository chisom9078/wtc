import { useWeb3Modal } from "@web3modal/wagmi/react";
import useCustomModalStyle from "../hooks/useCustomModalStyle.js";

export default function ConnectButton({ address }) {
  useCustomModalStyle();
  const { open } = useWeb3Modal();

  return (
    <button
      onClick={() => open()}
      className="ml-6 bg-yellow-400 flex-shrink-0 rounded-md mt-2 text-black px-7 py-3 font-bold"
    >
      {address
        ? `${address?.substring(0, 4)} .... ${address.substring(
            address.length - 1,
            address.length - 5
          )}`
        : "Connect Wallet"}
    </button>
  );
}
