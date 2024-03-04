"use client";
import { authContext } from "@/context/authContext/AuthProvider";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { Alert, Button, Space, message } from "antd";
import { useRouter } from "next/navigation";
import { updateProfile } from "firebase/auth";
import auth from "firebase.config";

const Page = () => {
  const { googleSignIn, emailSignUp, updateUser } = useContext(authContext);
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();

  const handleSignUp = async (form) => {
    const name = form.get("name");
    const email = form.get("email");
    const password = form.get("password");

    emailSignUp(email, password)
      .then(res => {
        if (res.user) {
          updateProfile(auth.currentUser, { displayName: name })
            .then(() => {
              fetch("/api/user", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  email: res.user.email,
                  userName: res.user.displayName,
                  role: "user",
                  userId: res.user.uid
                })
              }).then(() => {
                messageApi.open({
                  type: "success",
                  content: "Logged in successfully",
                });
              })
            })
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
   };

  const handleGoogleSignIn = () => {
    return googleSignIn()
      .then((res) => {

        if (res.user) {
          messageApi.open({
            type: "success",
            content: "Logged in successfully",
          });

          fetch("/api/user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              email: res.user.email,
              userName: res.user.displayName,
              role: "user",
              userId: res.user.uid
            })
          })
        }
        router.push("/");
      })
      .catch((err) => {
        messageApi.open({
          type: "error",
          content: "Something went wrong",
        });
      });
  };

  return (
    <div>
      {contextHolder}
      <div className="flex mx-10 md:mx-0">
        <div className="w-1/2 relative hidden md:flex">
          <Image
            fill
            src={"/registerlogo.svg"}
            className={"w-full h-full object-cover absolute"}
            alt={"register-logo"}
          />
        </div>
        <div className="relative md:w-1/2 w-full my-10">
          <button
            onClick={() => handleGoogleSignIn()}
            className="flex hover:bg-orange-500 hover:text-white  w-full sm:w-2/3 mx-auto justify-center items-center gap-2 border-2"
          >
            <div className=" text-3xl my-2">
              <FcGoogle />
            </div>
            <p>Sign In With Google</p>
          </button>
          <p className="text-center mt-4">OR</p>
          <form action={handleSignUp} className="sm:w-2/3 bg-right bg-contain bg-no-repeat  w-full  bg-[url('/illustration-1.svg')]  lg:px-0 mx-auto">
            <div className="pb-2 pt-4">
              <h4
                className={
                  "text-left text-[0.875rem] font-normal text-[#4F4F4F]"
                }
              >
                Name
              </h4>
              <input
                type="text"
                name="name"
                id="name"
                className="block focus:shadow-md transition border border-[#CACACA]  h-[3rem] w-full outline-none p-4 text-lg rounded-[0.125rem]"
                required
              />
            </div>
            <div className="pb-2 pt-4">
              <h4
                className={
                  "text-left text-[0.875rem] font-normal text-[#4F4F4F]"
                }
              >
                Email
              </h4>
              <input
                type="email"
                name="email"
                id="email"
                className="block focus:shadow-md transition border border-[#CACACA]  h-[3rem] w-full outline-none p-4 text-lg rounded-[0.125rem]"
                required
              />
            </div>
            <div className="pb-2 pt-4">
              <h4
                className={
                  "text-left text-[0.875rem] font-normal text-[#4F4F4F]"
                }
              >
                Password
              </h4>
              <input
                type="password"
                name="password"
                id="password"
                className="block focus:shadow-md transition border border-[#CACACA]  h-[3rem] w-full outline-none p-4 text-lg rounded-[0.125rem] "
                required
              />
            </div>
            <div className="my-6">
              <input
                className=" bg-[#3A0CA3] block w-full  cursor-pointer btn  font-normal  text-white focus:outline-none text-center hover:bg-blue-800"
                type={"submit"}
                value={"Sign Up"}
              />
            </div>
            <p className={"text-center mt-3 font-medium text-gray-600"}>
              Already An User?{" "}
              <Link href={"/login"} className={"text-[#3A0CA3]"}>
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
