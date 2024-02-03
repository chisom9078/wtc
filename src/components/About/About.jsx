import Side1 from "../../assets/sideimage1.jpg"


export default function About() {
  return (
    <div className="bg-[#182732] pb-4 md:pb-16  sm:pb-24  ">
      <div className="bg-[#182732] pb-20 sm:pb-24 xl:pb-0">
        <div className="mx-auto flex  max-w-[1200px] flex-col items-center gap-x-8 gap-y-10 px-6 sm:gap-y-8 lg:px-8 xl:flex-row xl:items-stretch">
        <div className="w-full max-w-2xl xl:max-w-none xl:flex-auto  xl:py-24">
            <figure className="relative isolate pt-6 sm:pt-10 gap-3">
              
              <h3 className="text-xl font-bold leading-8 text-white sm:text-4xl sm:leading-9 pb-5">
              How Winter Coin Works
              </h3>

              <li className=" text-lg leading-8 text-gray-300 list-decimal" >
            <strong>  Deposit and Security</strong> <br />
              Investing in Winter Coin begins with a simple deposit. Your initial investment is securely stored within our AI-powered ecosystem. Our cutting-edge security measures ensure the safety and confidentiality of your funds.
              </li>

              {/* 2 */}
              <li className=" text-lg leading-8 text-gray-300 list-decimal mt-4 " >
            <strong>AI-Powered Growth</strong> <br />
            Once your investment is secure, Winter Coin's AI algorithms come into play. These advanced systems continuously analyze market trends, identifying optimal opportunities for growth. The AI dynamically adjusts investment strategies, leveraging real-time data to maximize returns
              </li>
              {/* 3 */}
              <li className=" text-lg leading-8 text-gray-300 list-decimal mt-4 " >
            <strong>Constant Monitoring and Adaptation</strong> <br />
            Our AI is not static; it's an ever-evolving system. Winter Coin's algorithms are in a perpetual state of monitoring and adaptation. They react swiftly to market changes, mitigating risks, and seizing opportunities, ensuring that your investment stays on a trajectory towards growth.

              </li>
              {/* 4 */}
              <li className=" text-lg leading-8 text-gray-300 list-decimal mt-4 " >
            <strong>Reaping the Rewards</strong> <br />
            Experience the potential of Winter Coin's exponential growth. Our platform is designed to offer exceptional returns. In just three months, witness the possibility of your investment multiplying by 100x.

              </li>
              {/* 5 */}
              <li className=" text-lg leading-8 text-gray-300 list-decimal mt-4 " >
            <strong>Backed by Leading AI and Tech Companies</strong> <br />
            Winter Coin isn't just a promise; it's a collaboration with the best in the industry. Our partnerships with top AI and tech companies guarantee that your investment is fortified by expertise and innovation.

              </li>
              {/* 6 */}
              <li className=" text-lg leading-8 text-gray-300 list-decimal mt-4 " >
            <strong>Your Financial Shelter</strong> <br />
            Winter Coin represents more than just a token; it's your financial shelter amid economic uncertainty. It's a platform where security, growth, and innovation converge to create a haven for your wealth.

              </li>
            </figure>
          </div>

          <div className="-mt-8 w-full max-w-2xl xl:-mb-8 xl:w-96 xl:flex-none pt-8 md:pt-0">
            <div className="relative aspect-[2/1] h-full md:-mx-8 xl:mx-0 xl:aspect-auto">
              <img
                className="absolute inset-0 h-full w-full rounded-2xl bg-[#1E202D] object-cover shadow-2xl "
                src={Side1}
                alt=""
              />
            </div>
          </div>
    
        </div>
      </div>
    </div>
  );
}
