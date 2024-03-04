"use client";

import { authContext } from "@/context/authContext/AuthProvider";
import React, { useContext } from "react";

const Page = () => {
  const { currentUser } = useContext(authContext);
  return (
    <div className="w-[80vw] h-full flex justify-center items-center mx-auto">
      <div className="card card-side bg-base-100 shadow-xl ">
        <figure>
          <img
            src={
              currentUser?.photoURL != null ? currentUser.photoURL : "/gameravatar.png"
            }
            alt="Movie"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{currentUser?.displayName}</h2>
          <p>{currentUser?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Page;
