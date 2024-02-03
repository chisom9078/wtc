import background from "../../assets/HeaderImage.jpg";
import BuyWTC from "../BuyWTC button/BuyWTC";
import { useState } from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
   faTelegram,
   faTwitter
}from  '@fortawesome/free-brands-svg-icons'

export default function Header() {
  const [isPopupOpen, setPopupOpen] = useState(false);
  return (
    <div
      className="relative px-6 py-24 sm:py-32 lg:px-8 md:min-h-[100vh] flex justify-center items-center   "
      style={{ backgroundImage: `url("${background}")`, backgroundPosition: "center",backgroundRepeat:"no-repeat" }}
    >
     
      <div className="absolute inset-0 bg-[#040404] opacity-50"></div>

      <div className="relative mx-auto max-w-[900px] text-center">
      <div className=" fixed text-yellow-500 right-0  mx-20   z-50 justify-end "  style={{fontSize:40}}>
        <a href="https://t.me/wintercoinproject"><FontAwesomeIcon icon={faTelegram} className=" hover:text-white"/></a>
        </div>
        <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl my-6 ">
        About
        </h2>
        <h3 className="text-2xl font-bold tracking-tight text-white sm:text-2xl">The Winter Coin Story: A Fusion of Innovation and Security</h3>
        <p className="mt-6 text-lg leading-8 text-gray-300">
        At Winter Coin, our journey is more than just financial stability—it's a narrative driven by the fusion of groundbreaking technology and unwavering security.
        </p>
        <p className="mt-6 text-lg leading-8 text-gray-300">
        Picture this: a world where your investment isn't merely safeguarded but propelled forward by the force of artificial intelligence. This is the cornerstone of Winter Coin.
        </p>
        <p  className="mt-6 text-lg leading-8 text-gray-300">Our founders, propelled by a relentless pursuit of financial empowerment, envisioned a haven where AI stands guard over your investment, safeguarding it against the unpredictable tides of the market. The core of Winter Coin lies in leveraging the power of AI algorithms, meticulously crafted to not only protect your initial deposit but also to nurture its growth.</p>
      <p  className="mt-6 text-lg leading-8 text-gray-300">Imagine entrusting your hard-earned savings to an ecosystem where advanced AI algorithms work tirelessly, analyzing market trends, and making strategic decisions in real-time. Winter Coin harnesses the potential of AI to curate a dynamic investment strategy tailored to maximize returns, even amidst the most uncertain financial climates.</p>
      <p  className="mt-6 text-lg leading-8 text-gray-300">The fusion of AI and finance isn't just a concept; it's the very essence of Winter Coin—a promise of stability, growth, and unparalleled security. We've forged partnerships with leading AI and tech companies, ensuring that our investors benefit from the expertise and innovation of the best minds in the industry.</p>
      <p className="mt-6 text-lg leading-8 text-gray-300">Invest in Winter Coin today and witness the synergy of AI and finance sculpting a new paradigm in the world of investments.</p>

        <div className="mt-8">
          {/* <button
            type="button"
            className="relative  shadow-xl rounded-md text-gray-900 hover:text-white bg-yellow-400 px-12 py-3 font-bold"
          style={{boxShadow:"0px 1px 10px 0px #c6b270b8 "}}
          >
            BUY WTC
          </button> */}
          <BuyWTC isPopupOpen={isPopupOpen} setPopupOpen={setPopupOpen} />
        </div>
      </div>
    </div>
  );
}

