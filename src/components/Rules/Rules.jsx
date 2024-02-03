import logo from "../../assets/logo1.svg";
import logo2 from "../../assets/logo2.svg";
import logo3 from "../../assets/logo3.svg";
import logo4 from "../../assets/logo4.svg";
const actions = [
  {
    title: "Connect Your Wallet",
    href: "#",
    icon: logo3,
    li: [
      " Visit the Winter Coin website and locate the Buy Now button",
      "Click on the button to initiate the buying process",
      "Connect your cryptocurrency wallet that holds Binance Coin (BNB). We support wallets compatible with BNB, such as MetaMask or Trust Wallet.",
    ],
  },
  {
    title: "Select the Amount of Winter Coin",
    href: "#",
    icon: logo2,
    li: [
      "Once your wallet is connected, choose the amount of Winter Coin you want to purchase using your BNB",
      "Review the current exchange rate for BNB to Winter Coin",
    ],
  },
  {
    title: "Confirm the Transaction",
    href: "#",
    icon: logo,
    li: [
      "After selecting the desired amount, confirm the transaction details.",
      "Review and approve the transaction on your wallet. Ensure you have sufficient BNB to cover the purchase.",
    ],
  },
  {
    title: "Receive Winter Coin in Your Wallet",
    href: "#",
    icon: logo4,
    li: [
      "Once the transaction is confirmed on the blockchain, you will receive Winter Coin directly in your connected wallet.",
      "Congratulations! You are now a proud Winter Coin holder, securing your investment in our AI-powered financial ecosystem.",
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Rules() {
  return (
    <div className="bg-[#191B28] pt-8 md:pt-20 flex justify-center items-start flex-col">
      <div className=" overflow-hidden rounded-lg bg-[#191B28] shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0 max-w-[1200px] mx-auto">
        {actions.map((action, actionIdx) => (
          <div
            key={action.title}
            className={classNames(
              actionIdx === 0
                ? "rounded-tl-lg rounded-tr-lg sm:rounded-tr-none"
                : "",
              actionIdx === 1 ? "sm:rounded-tr-lg" : "",
              actionIdx === actions.length - 2 ? "sm:rounded-bl-lg" : "",
              actionIdx === actions.length - 1
                ? "rounded-bl-lg rounded-br-lg sm:rounded-bl-none"
                : "",
              "group relative bg-[#191B28] p-6 flex flex-col items-center justify-center" 
            )}
          >
            <div>
              <img src={action.icon} alt="" />
            </div>
            <div className=" mt-6 md:pb-10 ">
              <h3 className="text-[20px] font-bold leading-6 text-gray-300 justify-center flex mb-4">
                <a href={action.href} className="focus:outline-none">
                  <span
                    className="absolute inset-0 text-lg "
                    aria-hidden="true"
                  />
                  {action.title}
                </a>
              </h3>
              <div className="w-full md:max-w-[90%] flex flex-col md:justify-center md:items-center md:text-center">
                <ul>
                  {action.li.map((item, index) => (
                    <li
                      key={index}
                      className="text-gray-300 text-sm font-bold pb-3 list-disc"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
       
      </div>
      <div className="overflow-hidden rounded-lg bg-[#191B28] shadow px-4 sm:gap-px sm:divide-y-0 max-w-[1200px] mx-auto">
          <p className="text-lg text-yellow-300">
            Note: Always ensure you are on the official Winter Coin website and
            verify the wallet connection to prevent any fraudulent activities.
            Be mindful of gas fees and ensure your wallet has enough BNB to
            cover them.
          </p>
        </div>
    </div>
  );
}
