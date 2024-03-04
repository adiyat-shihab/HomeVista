

const BannerSelectionForm = () => {
  return (
    <form action="">
      <input
        type="text"
        className={
          "bg-[#d4d4d433] w-full py-[1.5rem] px-[1.25rem] rounded-[1.25rem] outline-none mb-[1.18rem]"
        }
        placeholder={"Dhanmondi, Bashundara, etc"}
      />
      <div className={"relative cursor-pointer"}>
        <select
          className={
            "bg-[#d4d4d433] w-full py-[1.5rem] px-[1.25rem] text-[#AAAAAA] rounded-[1.25rem] outline-none mb-[1.18rem] cursor-pointer "
          }
          defaultValue="Demo select"
          style={{
            appearance: "none",
            WebkitAppearance: "none",
            MozAppearance: "none",
          }}
        >
          <option>Select Property Type</option>
          <option>Demo</option>
          <option>Demo</option>
        </select>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="7"
          viewBox="0 0 14 7"
          fill="none"
          className={"absolute top-[40%] -translate-y-[50%] right-4"}
        >
          <path
            d="M7.58521 6.57766C7.23581 6.82982 6.76419 6.82982 6.41479 6.57767L0.848983 2.56089C0.0621447 1.99304 0.46384 0.750001 1.43419 0.750001L12.5658 0.75C13.5362 0.75 13.9379 1.99303 13.151 2.56088L7.58521 6.57766Z"
            fill="#AAAAAA"
          />
        </svg>
      </div>{" "}
      <div className={"relative cursor-pointer"}>
        <select
          className={
            "bg-[#d4d4d433] w-full py-[1.5rem] px-[1.25rem] text-[#AAAAAA] rounded-[1.25rem] outline-none mb-[1.18rem] cursor-pointer"
          }
          defaultValue="Demo select"
          style={{
            appearance: "none",
            WebkitAppearance: "none",
            MozAppearance: "none",
          }}
        >
          <option>Select Rooms</option>
          <option>Demo</option>
          <option>Demo</option>
        </select>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="7"
          viewBox="0 0 14 7"
          fill="none"
          className={"absolute top-[40%] -translate-y-[50%] right-4"}
        >
          <path
            d="M7.58521 6.57766C7.23581 6.82982 6.76419 6.82982 6.41479 6.57767L0.848983 2.56089C0.0621447 1.99304 0.46384 0.750001 1.43419 0.750001L12.5658 0.75C13.5362 0.75 13.9379 1.99303 13.151 2.56088L7.58521 6.57766Z"
            fill="#AAAAAA"
          />
        </svg>
      </div>
      <input
        type="submit"
        className={
          "bg-[#3A0CA3] py-[1.5rem] w-full text-white rounded-[3.125rem] mt-4 cursor-pointer"
        }
      />
    </form>
  );
};

export default BannerSelectionForm;
