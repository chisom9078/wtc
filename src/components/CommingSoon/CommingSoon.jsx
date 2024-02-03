import sideimage from "../../assets/sideimage.avif"

export default function CommingSoon() {
  return (
    <div className="relative bg-[#191B28] flex-col md:flex-row flex justify-center items-center" id="app">
      <div className="  overflow-hidden bg-indigo-600 md:absolute md:left-0 md:h-full md:w-1/3 lg:w-1/2">
        <img
          className="h-full w-full object-cover"
          src={sideimage}
          // src="https://images.unsplash.com/photo-1525130413817-d45c1d127c42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=60&blend=6366F1&sat=-100&blend-mode=multiply"
          alt=""
        />
        <svg
          viewBox="0 0 926 676"
          aria-hidden="true"
          className="absolute -bottom-24 left-24 md:w-[57.875rem] transform-gpu blur-[118px]"
        >
          <path
            fill="url(#60c3c621-93e0-4a09-a0e6-4c228a0116d8)"
            fillOpacity=".4"
            d="m254.325 516.708-90.89 158.331L0 436.427l254.325 80.281 163.691-285.15c1.048 131.759 36.144 345.144 168.149 144.613C751.171 125.508 707.17-93.823 826.603 41.15c95.546 107.978 104.766 294.048 97.432 373.585L685.481 297.694l16.974 360.474-448.13-141.46Z"
          />
          <defs>
            <linearGradient
              id="60c3c621-93e0-4a09-a0e6-4c228a0116d8"
              x1="926.392"
              x2="-109.635"
              y1=".176"
              y2="321.024"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#776FFF" />
              <stop offset={1} stopColor="#FF4694" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className=" mx-auto max-w-7xl py-24 sm:py-32  lg:py-12">
        <div className="pl-3 pr-3 md:ml-auto md:w-2/3 md:pl-16 lg:w-1/2 lg:pl-10 lg:pr-0 xl:pl-14">
          <h3 className="text-xl font-bold leading-8 text-white sm:text-4xl sm:leading-9 pb-5">
          Coming Soon: Winter Coin Trading and Storage App
          </h3>

          <h5 className="text-md font-semibold leading-8 text-white sm:text-xl sm:leading-9 pt-2">Empower Your Financial Future</h5>
          <p className="mt-2  tracking-tight text-gray-300 ">
          Get ready to take charge of your investments like never before! We're thrilled to announce the imminent arrival of the Winter Coin Trading and Storage App—a powerful platform designed to revolutionize how you interact with your finances.
          </p>

          <h5  className="text-md font-semibold leading-8 text-white sm:text-xl sm:leading-9 pt-2">Seamless Trading Experience</h5>
          <p className=" mt-2  tracking-tight text-gray-300 ">
          With our intuitive and user-friendly interface, buying, selling, and trading Winter Coin will be effortless. Seamlessly execute trades and track your investment's performance in real-time, all from the convenience of your fingertips.
          </p>
          {/* 3 */}
          <h5  className="text-md font-semibold leading-8 text-white sm:text-xl sm:leading-9 pt-2">Secure Storage Solutions</h5>
          <p className="mt-2  tracking-tight text-gray-300 ">
          Rest easy knowing that your Winter Coin investments are safeguarded by top-notch security features. Our storage solutions prioritize the safety and confidentiality of your assets, providing you with peace of mind throughout your financial journey.
          </p>
          {/* 4 */}
          <h5  className="text-md font-semibold leading-8 text-white sm:text-xl sm:leading-9 pt-2">AI-Driven Insights</h5>
          <p className="mt-2  tracking-tight text-gray-300 ">
          Access invaluable insights and trends curated by our AI algorithms. Stay ahead of the curve with data-driven analyses that guide your investment decisions, empowering you to make informed choices.
          </p>
          {/* 5 */}
          <h5  className="text-md font-semibold leading-8 text-white sm:text-xl sm:leading-9 pt-2">Join Us in Redefining Finance</h5>
          <p className="mt-2  tracking-tight text-gray-300 ">
          Winter Coin is not just a token; it's a movement towards financial empowerment. Join us in reshaping the future of finance by embracing innovation, security, and unparalleled growth opportunities.
          </p>
          {/* 6 */}
          <h5  className="text-md font-semibold leading-8 text-white sm:text-xl sm:leading-9 pt-2">Stay Tuned for Launch Updates</h5>
          <p className="mt-2  tracking-tight text-gray-300 ">
          The Winter Coin Trading and Storage App is on its way, bringing a new era of financial empowerment to your fingertips. Stay tuned for updates on the official launch date and be among the first to experience the future of intelligent investing.
          </p>
         

          <p className="text-yellow-300 mt-8 flex justify-center">Invest in Winter Coin today and secure your tomorrow.</p>

        </div>
       
      </div>
    </div>
  );
}
