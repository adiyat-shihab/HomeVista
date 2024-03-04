"use client";
import { authContext } from '@/context/authContext/AuthProvider';
import { Alert, Button, Space, message } from 'antd';
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react'
import { FcGoogle } from "react-icons/fc";

const Page = () => {
    const router = useRouter();
    const [messageApi, contextHolder] = message.useMessage();
    const { googleSignIn, emailSignIn} = useContext(authContext);

    const handleSignIn = async (form) => {
        const email = form.get('email');
        const password = form.get('password');
        emailSignIn(email, password)
        .then(res => {
            if(res.user){
                messageApi.open({
                    type: "success",
                    content: "Logged in successfully",
                  });

                  console.log(res.user);
        
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
                  }).then(()=>{
                    router.push("/");
                  })
            }
        })
        .catch(err => console.log(err));

    }

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(res => {
                if (res.user) {
                    messageApi.open({
                        type: 'success',
                        content: 'Logged in successfully',
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
            .catch(err => console.log(err));
    }

    return (
        <div>
            {contextHolder}

            <div className='flex flex-row-reverse mx-10 md:mx-0'>
                <div className='w-1/2 hidden md:flex relative'>
                    <Image
                        fill
                        src={"/registerlogo.svg"}
                        className={"w-full h-full object-cover absolute"}
                        alt={"register-logo"}
                        priority
                    />
                </div>
                <div className='relative w-full md:w-1/2 my-20'>
                    <button onClick={() => handleGoogleSignIn()} className='flex hover:bg-orange-500 hover:text-white  w-full sm:w-2/3 mx-auto justify-center items-center gap-2 border-2'>
                        <div className=' text-3xl my-2'>
                            <FcGoogle />
                        </div>
                        <p>Sign In With Google</p>
                    </button>
                    <p className='text-center mt-4'>OR</p>
                    <form
                        action={handleSignIn}
                        className="sm:w-2/3 bg-right bg-contain bg-no-repeat w-full  bg-[url('/illustration-1.svg')]  lg:px-0 mx-auto"
                    >

                        <div className="pb-2 pt-4">
                            <h4 className={"text-left text-[0.875rem] font-normal text-[#4F4F4F]"}>
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
                            <h4 className={"text-left text-[0.875rem] font-normal text-[#4F4F4F]"}>
                                Password
                            </h4>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="block focus:shadow-md transition border border-[#CACACA]  h-[3rem] w-full outline-none p-4 text-lg rounded-[0.125rem]"
                                required
                            />
                        </div>
                        <div className="my-6">
                            <input
                                className=" bg-[#3A0CA3] block w-full  cursor-pointer btn  font-normal  text-white focus:outline-none text-center hover:bg-blue-800"
                                type={"submit"}
                                value={"Sign In"}
                            />
                        </div>
                        <p className={"text-center mt-3 font-medium text-gray-600"}>
                            Don&lsquo;t have an account? {" "}
                            <Link href={"/register"} className={"text-[#3A0CA3]"}>
                                Sign up
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Page
