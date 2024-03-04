import Image from "next/image";

const WhoWeAre = () => {
  return (
    <div className={"md:mx-10 mx-6 mb-5 mt-10"}>
      <div
        className={
          "flex md:flex-row flex-col-reverse justify-center items-center"
        }
      >
        <div className="space-y-4">
          <h1
            className={
              "mb-20 text-[1.2125rem]  font-medium leading-normal text-[#4361EE]"
            }
          >
            WHO ARE WE
          </h1>

          <h1
            className={
              "font-semibold text-xl md:text-3xl text-[#0B090A] not-italic"
            }
          >
            Assisting individuals in locating the appropriate real estate.
          </h1>
          <div className={" text-[#808080] font-normal space-y-4"}>
            <p>
              {" "}
              Unlock the door to your dream home! Discover elegance, comfort,
              and{" "}
            </p>
            <p>
              endless possibilities in our curated selection of exquisite
              estates.{" "}
            </p>
            <p>
              Your sanctuary awaits – find the perfect space to create lasting
              memories.
            </p>
          </div>
        </div>
        <div className={"flex"}>
          <div className={"relative animate-bounce-slow"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="61"
              height="61"
              viewBox="0 0 61 61"
              fill="none"
              className={" absolute mt-[2.8]  "}
            >
              <circle
                opacity="0.5"
                cx="30.9808"
                cy="30.9808"
                r="30"
                transform="rotate(30 30.9808 30.9808)"
                fill="url(#paint0_linear_70_161)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_70_161"
                  x1="30.9808"
                  y1="0.980762"
                  x2="30.9808"
                  y2="60.9808"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#4361EE" />
                  <stop offset="1" stopColor="#4361EE" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
            <Image
              src={"/WhoWeAre/first-sec.png"}
              alt={"image"}
              width={400}
              height={400}
              className={"mt-[2.95rem]"}
            />
          </div>
          <div className={"flex flex-col gap-8  animate-bounce-very-slow"}>
            <Image
              src={"/WhoWeAre/second-sec.png"}
              alt={"image"}
              width={400}
              height={400}
            />
            <Image
              src={"/WhoWeAre/third-sec.png"}
              alt={"image"}
              width={400}
              height={400}
              className={"-mt-[2.95rem]"}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="61"
              height="61"
              viewBox="0 0 61 61"
              fill="none"
              className={"-mt-[4rem] mx-auto"}
            >
              <circle
                opacity="0.5"
                cx="30.9808"
                cy="30.9808"
                r="30"
                transform="rotate(30 30.9808 30.9808)"
                fill="url(#paint0_linear_70_161)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_70_161"
                  x1="30.9808"
                  y1="0.980762"
                  x2="30.9808"
                  y2="60.9808"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#4361EE" />
                  <stop offset="1" stopColor="#4361EE" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
      <div className="flex gap-6 lg:flex-row flex-col">
        <div
          className={
            "w-full lg:w-1/2 px-4 py-4  mt-2  rounded-xl gap-4 flex items-center"
          }
          style={{ boxShadow: "4px 10px 30px 0px rgba(0, 0, 0, 0.06)" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            className={"w-[2.5rem] h-[2.48013rem]"}
          >
            <path
              d="M30.531 38.8827H19.1277C18.3736 38.8827 17.7483 38.2573 17.7483 37.5032C17.7483 36.7491 18.3736 36.1238 19.1277 36.1238H30.531C32.499 36.1238 34.4301 34.4867 34.7612 32.5371L37.2074 17.897C37.4281 16.5727 36.6926 14.6781 35.6626 13.8505L22.9165 3.66125C21.4451 2.48414 18.999 2.48412 17.546 3.64284L4.8001 13.8505C3.75174 14.6965 3.03444 16.5727 3.25514 17.897L3.77013 21.0051C3.89888 21.7592 3.38391 22.4765 2.62982 22.5869C1.87574 22.734 1.17685 22.2006 1.0481 21.4465L0.533113 18.3568C0.146873 16.0761 1.25043 13.1517 3.07128 11.6987L15.8172 1.49086C18.2817 -0.495513 22.1624 -0.477102 24.6454 1.50927L37.3913 11.6987C39.1938 13.1517 40.2973 16.0761 39.9295 18.3568L37.4833 32.9969C36.9315 36.2524 33.8232 38.8827 30.531 38.8827Z"
              fill="#4361EE"
            />
            <path
              d="M7.35738 39.2322C6.60329 39.2322 5.99634 38.6253 5.97795 37.8896C5.92277 35.4066 4.28587 33.7697 1.80291 33.7145C1.04882 33.6961 0.441854 33.0708 0.460246 32.2983C0.478638 31.5442 1.08559 30.9557 1.83967 30.9557H1.87644C5.8308 31.0477 8.66324 33.8617 8.7368 37.816C8.7552 38.5701 8.14823 39.2139 7.39415 39.2322C7.37575 39.2322 7.37577 39.2322 7.35738 39.2322Z"
              fill="#4361EE"
            />
            <path
              d="M12.8751 39.2323C12.121 39.2323 11.4956 38.6253 11.4956 37.8712C11.4772 36.6573 11.2749 35.4986 10.9071 34.4135C9.96906 31.7282 7.9643 29.7416 5.27901 28.7852C4.19386 28.399 3.03515 28.1968 1.82125 28.1968C1.06716 28.1968 0.441842 27.5715 0.460235 26.799C0.460235 26.0449 1.08557 25.438 1.83966 25.438H1.85805C3.38462 25.4564 4.8376 25.7139 6.19863 26.1921C9.67479 27.4244 12.2681 30.0177 13.5004 33.4938C13.9786 34.8549 14.2361 36.3263 14.2545 37.8344C14.2545 38.6069 13.6476 39.2323 12.8751 39.2323Z"
              fill="#4361EE"
            />
            <path
              d="M1.83924 39.6921C0.809264 39.6921 0 38.8645 0 37.8529C0 36.8413 0.827656 36.0137 1.83924 36.0137C2.85082 36.0137 3.67847 36.8413 3.67847 37.8529C3.67847 38.8645 2.86921 39.6921 1.83924 39.6921Z"
              fill="#4361EE"
            />
          </svg>
          <div>
            <h1 className={"text-[1.2125rem] font-medium text-[#4361EE]"}>
              Your Next Chapter Begins Here
            </h1>
            <p
              className={
                "mt-[0.5rem] text-[1rem] font-normal text-[#808080] leading-[1.625rem]"
              }
            >
              Explore a world of possibilities with our curated
              collection of dream homes
            </p>
          </div>
        </div>
        <div
          className={
            "w-full lg:w-1/2 px-4 py-4  mt-2  rounded-xl gap-4 flex items-center"
          }
          style={{ boxShadow: "4px 10px 30px 0px rgba(0, 0, 0, 0.06)" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="44"
            height="48"
            viewBox="0 0 44 48"
            fill="none"
            className={"w-[2.5rem] h-[2.48013rem]"}
          >
            <path
              d="M42 16.4958V31.5535C42 34.0191 40.6791 36.3086 38.5437 37.5634L25.4672 45.1143C23.3318 46.3471 20.6901 46.3471 18.5327 45.1143L5.45625 37.5634C3.32086 36.3306 2 34.0411 2 31.5535V16.4958C2 14.0302 3.32086 11.7406 5.45625 10.4858L18.5327 2.93486C20.6681 1.70205 23.3098 1.70205 25.4672 2.93486L38.5437 10.4858C40.6791 11.7406 42 14.0081 42 16.4958Z"
              stroke="#4361EE"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M22.011 21.8234C24.844 21.8234 27.1403 19.5268 27.1403 16.6939C27.1403 13.8611 24.844 11.5647 22.011 11.5647C19.1782 11.5647 16.8817 13.8611 16.8817 16.6939C16.8817 19.5268 19.1782 21.8234 22.011 21.8234Z"
              stroke="#4361EE"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M30.8167 34.2836C30.8167 30.321 26.8761 27.1069 22.0109 27.1069C17.1458 27.1069 13.2052 30.321 13.2052 34.2836"
              stroke="#4361EE"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div>
            <h1 className={"text-[1.2125rem] font-medium text-[#4361EE]"}>
              Explore Endless Possibilities
            </h1>
            <p
              className={
                "mt-[0.5rem] text-[1rem] font-normal text-[#808080] leading-[1.625rem]"
              }
            >
              Welcome to a journey of discovering homes that speak to
              your heart and reflect your unique lifestyle.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhoWeAre;
