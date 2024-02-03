import "smart-webcomponents-react/source/styles/smart.default.css";
import Navbar from "../src/components/Navbar/Navbar";
import Header from "./components/Header/Header";
import About from "./components/About/About";
import Clam from "./components/Clam/Clam";
import Rules from "./components/Rules/Rules";

import PieChart from "../src/components/Chart/Charts";

import "./App.css";
import CommingSoon from "./components/CommingSoon/CommingSoon";
import Partners from "./components/Partners/Partners";
import { Footer } from "./components/Footer/Footer";

// import Popup from "./components/Popup/Popup";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WagmiConfig, createConfig } from "wagmi";
import { bsc } from "wagmi/chains";
import { wagmiConfig } from "./wagmiConfig";
import WhyWtc from "./components/Why WTC/WhyWtc";

function App() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <Navbar />
      <Header />
      <About />
      <div className="bg-[#191B28]">
        <Clam />
        <Rules />
        <WhyWtc />
      </div>

      <div className="chartParentDiv bg-[#182732] py-20  px-6 " id="Tokenomics">
        <div className=" flex justify-center items-center flex-col  pb-11 ">
          <h4 className="text-xl font-bold leading-8 text-white sm:text-4xl sm:leading-9 pb-5">
            WTC Tokenomics
          </h4>
          <p className="text-lg leading-8 text-gray-300 pt-5">
            There are a total of 1,000,000,000 WTC tokens that will be
            distributed. Heres a
          </p>

          <p className="text-lg leading-8 text-gray-300">
            breakdown of the WTC token:
          </p>
        </div>
        <PieChart />
      </div>
      <CommingSoon />
      <Partners />
      <Footer />
    </WagmiConfig>
  );
}

export default App;
