"use client";

import Image from "next/image";
import CountUp from "react-countup";
import useSWR from "swr";

const Banners = () => {
  const url = "/api/count-user-property-reports";
  const {data, isLoading} = useSWR(url, GetDataCount);
  
  return (
    <div className={" "}>
      <div className="w-full pt-11  md:pb-40 md:rounded-b-[28rem] bg-gradient-to-b from-[#4cc9f000] to-[#4361ee4d] z-0">
        <div
          className={
            "flex md:mx-20 mx-6  md:flex-row flex-col justify-center items-center"
          }
        >
          <div className="space-y-4 ">
            <h1 className="md:text-xl  font-medium leading-normal text-[#4361EE]">
              REAL ESTATE
            </h1>
            <h1 className={"text-3xl font-semibold text-[#0B090A] not-italic"}>
              Find a perfect <br /> home you love..!
            </h1>
            <p className={"text-[#808080] font-normal"}>
              "Discover your dream home or sell your property hassle-free with
              HomeVista's trusted platform today!"
            </p>
          </div>
          <div className={""}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="61"
              height="61"
              viewBox="0 0 61 61"
              fill="none"
              className={
                "animate-bounce-slow text-end -mb-[3rem]  relative float-right"
              }
            >
              <circle
                cx="30.1698"
                cy="30.1699"
                r="30"
                transform="rotate(30 30.1698 30.1699)"
                fill="url(#paint0_linear_29_153)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_29_153"
                  x1="30.1698"
                  y1="0.16988"
                  x2="30.1698"
                  y2="60.1699"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#4361EE" />
                  <stop offset="1" stopColor="#4361EE" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
            <Image
              src={"/banner-demo.png"}
              alt="home"
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>

      <div>
        <div className={"flex items-center justify-center -mt-10"}>
          <div
            className=" p-4 drop-shadow-2xl rounded-full h-full bg-white gap-2 flex items-center justify-between"
            style={{ boxShadow: "10px 30px 50px 0px rgba(0, 0, 0, 0.05)" }}
          >
            <div className="avatar-group -space-x-6 rtl:space-x-reverse">
              <div className="avatar">
                <div className="w-12">
                  <Image
                    width={200}
                    height={200}
                    src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  />
                </div>
              </div>
              <div className="avatar">
                <div className="w-12">
                  <Image
                    width={200}
                    height={200}
                    src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  />
                </div>
              </div>
              <div className="avatar">
                <div className="w-12">
                  <Image
                    width={200}
                    height={200}
                    src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  />
                </div>
              </div>
            </div>
            <h1 className={"font-medium flex md:text-xl text-md"}>
              <CountUp
                start={0}
                end={data?.usersCount}
                duration={2.75}
                separator=","
                onEnd={() => console.log("Ended! 👏")}
                onStart={() => console.log("Started! 💨")}
              >
                {({ countUpRef, start }) => (
                  <div>
                    <span ref={countUpRef} />
                  </div>
                )}
              </CountUp>
              + Happy Customers
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banners;


const GetDataCount = async (url) => {
  const res = await fetch(url);
  const count = await res.json();
  return count;
}