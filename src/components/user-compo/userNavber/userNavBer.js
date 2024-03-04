"use client";

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { FaHouse, FaHouseUser, FaUsers } from 'react-icons/fa6'
import { LuMessageSquare, LuTableProperties } from 'react-icons/lu'
import { MdReport } from 'react-icons/md'

const UserNavBer = () => {
    const pathName = usePathname();
    const links = [
        {
            link: "/dashboard/user",
            icon: <FaHouse />,
            linkText: "Profile"
        },

        {
            link: "/dashboard/user/my-properties",
            icon: <LuTableProperties />,
            linkText: "My Properties"
        },
        
    ]

    return (
        <ul className=" mx-4 flex flex-col mt-4  rounded-none text-left bg-gray-200 gap-1  ">
            {
                links.map(
                    (link, index) => <li key={index} className=''>
                        <Link
                            className={`${link.link == pathName ? "  active:bg-white  bg-white  focus:bg-white" : ""} rounded-s-xl flex py-2 gap-2 pl-3  pr-4 md:pr-8 e lg:pr-12 hover:bg-white  text-sm md:text-md lg:text-base -mr-4 flex-row items-center justify-start`}
                            href={link.link}
                        >
                            {link.icon} {link.linkText}
                        </Link>
                    </li>
                )
            }
        </ul>
    )
}

export default UserNavBer;
