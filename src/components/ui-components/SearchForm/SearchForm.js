"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SearchForm = () => {
  const [keyword, setKeyword] = useState("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const submitHandler = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (keyword) {
      params.set("title", keyword);
      replace(`${pathname}?${params.toString()}`);
    } else {
      console.log(pathname);
      replace(`${pathname}`);
    }
    
  };

  return (
    <form onSubmit={submitHandler} className="flex justify-center items-center">
      <div className="join p-5">
        <div>
          <div>
            <input
              className="input input-bordered join-item"
              placeholder="Search"
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              defaultChecked={searchParams.get("title")?.toString()}
            />
          </div>
        </div>
        <div className="indicator">
          <button type="submit" className="btn join-item">
            Search
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchForm;
