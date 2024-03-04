"use client";

import { authContext } from "@/context/authContext/AuthProvider";
import Link from "next/link";
import { Alert, Button, Space, message } from "antd";
import { MdOutlineHomeWork } from "react-icons/md";
import { usePathname } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LuHeart } from "react-icons/lu";

const AdminTopNavBar = () => {
  const router = useRouter();
  const pathName = usePathname();
  const [hideLogic, setHideLogic] = useState(true);
  const { logOut, currentUser, logInfo } = useContext(authContext);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const logic = currentUser ? false : true;
    setHideLogic(() => logic);
  }, [currentUser, logOut]);


  console.log(currentUser);
  const handleLogOut = () => {
    logOut()
      .then(() => {
        messageApi.open({
          type: "success",
          content: "Logout successfully",
        });
        router.push("/login");
      })
      .catch((err) => console.log(err));
  };


  return (
    <div className="navbar bg-base-100 shadow-md px-8">
      {contextHolder}
      <div className="navbar-start">
        <Link href="/" className="flex  items-center gap-2 ">
          <span className="text-lg md:text-3xl bg-secondary p-2 text-white rounded-full">
            <MdOutlineHomeWork />
          </span>{" "}
          Home Vista
        </Link>
      </div>

      <div className="navbar-end">
        <div className=" justify-end md:flex hidden">
          {!currentUser && (
            <Link
              href="/login"
              className="btn hover:bg-blue-800 md:btn-md btn-sm bg-secondary text-white"
            >
              Login/Register
            </Link>
          )}
        </div>
        {currentUser && (
          <div className="flex items-center gap-2">
            <p className="text-gray-500 text-md">{currentUser?.displayName}, {logInfo?.role}</p>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full border border-secondary">
                  <img
                    alt="avater"
                    src={
                      currentUser.photoURL != null ? currentUser.photoURL : "/gameravatar.png"
                    }
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >

                <li>
                  <Link href="/favourites" className="">
                    <LuHeart /> Favourites
                  </Link>
                </li>

                <button
                  onClick={handleLogOut}
                  className="btn mt-4
                 text-white bg-secondary hover:bg-blue-800"
                >
                  Logout
                </button>
              </ul>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default AdminTopNavBar;
