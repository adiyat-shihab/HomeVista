import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BiHome } from "react-icons/bi";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#FBFBFB]">
      <div className="w-52 h-32 relative">
        <Image
          fill
          objectFit="cover w-full"
          className="absolute"
          src={"/assets/not-found.gif"}
        />
      </div>
      <div className="mt-4 flex flex-col justify-center items-center space-y-6">
        <h4>Page Not Found</h4>
        <Link className="btn btn-sm btn-primary " href="/">
          <BiHome /> Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
